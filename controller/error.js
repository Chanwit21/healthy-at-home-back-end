const errorController = (err, req, res, next) => {
  console.log(err);

  let code;

  if (err.name === 'MulterError') {
    code = 400;
  }

  res.status(code || err.code || err.http_code || 500).json({ message: err.message });
};

module.exports = errorController;
