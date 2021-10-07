const omise = require('omise')({ secretKey: 'skey_test_5ov8h8rdpslf54x97k1' });
const { Transaction, User, UserTrainerWorkoutScheduleFoodSchedule } = require('../models');

exports.payMentByCard = (req, res, next) => {
  const { token, amount, serviceId, state } = req.body;
  omise.charges.create(
    {
      name: req.user.firstName + ' ' + req.user.lastName,
      amount: amount,
      currency: 'THB',
      card: token,
      metadata: { ...state, userId: req.user.id, serviceId },
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
  const { source, amount, serviceId, state } = req.body;
  omise.charges.create(
    {
      name: req.user.firstName + ' ' + req.user.lastName,
      amount: amount,
      currency: 'THB',
      return_uri: 'http://localhost:3000/paymentsuccesspage',
      source: source,
      metadata: { ...state, userId: req.user.id, serviceId },
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
    const { amount, id, card, source, created_at, paid_at, expires_at, status, metadata } = req.body.data;
    // console.log({ amount, id, card, source, created_at, paid_at, expires_at, status, metadata });
    if (status === 'successful' || status === 'failed') {
      // console.log({ amount, id, card, source, created_at, paid_at, expires_at, status, metadata });
      const transaction = await Transaction.create({
        omiseCreatedAt: created_at,
        cardId: card?.id || null,
        sourceId: source?.id || null,
        amount: amount / 100,
        chargeId: id,
        paidAt: paid_at,
        expiresAt: expires_at,
        courseServiceId: metadata.serviceId,
        userId: metadata.userId,
        status,
      });
    }

    if (status === 'successful' && !!source) {
      const trainers = await User.findAll({ where: { role: 'TRAINER' }, attributes: ['id', 'role'] });
      const randomNumber = Math.floor(Math.random() * (trainers.length + 1));
      const trainerId = trainers[randomNumber].id;
      const userTrainerRelational = await UserTrainerWorkoutScheduleFoodSchedule.create({
        courseServiceId: metadata.serviceId,
        userId: metadata.userId,
        trainerId: trainerId,
        loseWeightBefore: metadata.loseWeightBefore || null,
        desease: metadata.disease.message || null,
        dateStart: metadata.dateToStart,
        foodAllergic: metadata.foodAllergic || null,
        typeOfFood: metadata.typeOfFood,
      });
    }
    // console.log(req.body.data);
    res.send();
  } catch (err) {
    next(err);
  }
};
