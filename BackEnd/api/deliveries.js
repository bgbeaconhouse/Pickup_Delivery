const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

//get list of all deliveries
router.get("/", async (req, res, next) => {
    try {
        const deliveries = await prisma.delivery.findMany()
        res.json(deliveries)
    } catch (error) {
        next();
    }
})

