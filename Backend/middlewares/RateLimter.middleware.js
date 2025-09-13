const rateLimit = require("express-rate-limit");

module.exports.GlobalLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: "Too many requests, please try again after 5 minutes",
});

module.exports.authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again after 15 minutes",
});

module.exports.aiLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests For AI, please try again after 1 minutes",
});
