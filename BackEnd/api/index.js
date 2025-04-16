const router = require("express").Router();
module.exports = router;

router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/pickups", require("./pickups"));
router.use("/deliveries", require("./deliveries"))