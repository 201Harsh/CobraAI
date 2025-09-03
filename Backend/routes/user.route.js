const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("user sayingg hello");
});

module.exports = router;
