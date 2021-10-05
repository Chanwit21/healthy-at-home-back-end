const omise = require('omise')({ secretKey: 'skey_test_5ov8h8rdpslf54x97k1' });
const { Transaction } = require('../models');

exports.payMentByCard = (req, res, next) => {
  const { token, amount, serviceId } = req.body;
  omise.charges.create(
    {
      name: req.user.firstName + ' ' + req.user.lastName,
      amount: amount,
      currency: 'thb',
      card: token,
      description: req.user.id + '||' + serviceId,
    },
    function (err, charge) {
      if (err) {
        next(err);
      } else {
        // console.log(charge);
        res.status(200).json({ charge });
      }
    }
  );
};

exports.payMentBySource = (req, res, next) => {
  const { source, amount, serviceId } = req.body;
  omise.charges.create(
    {
      name: req.user.firstName + ' ' + req.user.lastName,
      amount: amount,
      currency: 'THB',
      description: req.user.id + '||' + serviceId,
      return_uri: 'http://localhost:3000/paymentsuccesspage',
      source: source,
    },
    function (error, charge) {
      if (error) {
        next(error);
      } else {
        // console.log(charge);
        res.status(200).json({ charge });
      }
    }
  );
};

exports.webHook = async (req, res, next) => {
  try {
    const { amount, id, card, source, created_at, paid_at, expires_at, status, description } = req.body.data;
    // console.log({ amount, id, card, source, created_at, paid_at, expires_at, status, description });
    if (status === 'successful' || status === 'failed') {
      // console.log({ amount, id, card, source, created_at, paid_at, expires_at, status, description });
      const transaction = await Transaction.create({
        omiseCreatedAt: created_at,
        cardId: card?.id || null,
        sourceId: source?.id || null,
        amount: amount / 100,
        chargeId: id,
        paidAt: paid_at,
        expiresAt: expires_at,
        courseServiceId: description.split('||')[1],
        userId: description.split('||')[0],
        status,
      });
    }
    //   console.log(req.body.data);
    res.send();
  } catch (err) {
    next(err);
  }
};
