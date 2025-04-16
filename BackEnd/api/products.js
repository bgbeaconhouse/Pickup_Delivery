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

//Add new product

router.post("/", async (req, res, next) => {
    try {
       const { title, description, imageUrl } = req.body;
        console.log(req.body)
       if (!title || !description || !imageUrl) {
        const error = {
            status: 400,
            message: "You are missing required information.",
        };

        return next(error);
       }

       const product = await prisma.product.create({data: { title, description, imageUrl}});
       res.status(201).json(product)

    } catch {
        next();
    }
}) 