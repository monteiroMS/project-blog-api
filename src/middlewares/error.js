const errorMiddleware = (err, _req, res, _next) => {
  console.log(err.message);
  return res.status(500).json({
    message: 'Internal Server Error',
  });
};

module.exports = { errorMiddleware };
