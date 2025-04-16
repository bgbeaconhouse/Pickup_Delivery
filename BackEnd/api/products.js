const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    try {
        const products = await prisma.product.findMany()
        res.json(products)
    } catch (error) {
        next();
    }
})