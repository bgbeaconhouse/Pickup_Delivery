const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    try {
        const pickups = await prisma.pickup.findMany()
        res.json(pickups)
    } catch (error) {
        next();
    }
})