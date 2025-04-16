const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    try {
        const deliveries = await prisma.delivery.findMany()
        res.json(deliveries)
    } catch (error) {
        next();
    }
})