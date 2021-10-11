const errorController = (err, req, res, next) => {
  console.log(err);
  console.log(JSON.stringify(err, null, 2));

  let code;
  let message;

  if (err.name === 'MulterError') {
    code = 400;
  }

  if (err.code === 'ETIMEDOUT') {
    code = 400;
    message = 'Server Time out';
  }

  console.log(err.code);

  res.status(code || err.code || err.http_code || 500).json({ message: message || err.message });
};

module.exports = errorController;
