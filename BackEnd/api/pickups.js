const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

//Get all pickups
router.get("/", async (req, res, next) => {
    try {
        const pickups = await prisma.pickup.findMany({
            include: {
                products: {
                    select: {
                        title: true,
                        description: true,
                        imageUrl: true,
                        id: true,
                       
                    }
                }
            }
    })
        res.json(pickups)
    } catch (error) {
        next();
    }
})

  // Get a specific pickup
  router.get("/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
  
      const pickup = await prisma.pickup.findUnique({ where: { id } });
  
      if (!pickup) {
        return next({
          status: 404,
          message: `Could not find pickup with id ${id}.`,
        });
      }
  
      res.json(pickup);
    } catch {
      next();
    }
  });








//Create new pickup

router.post("/", async (req, res, next) => {
    try {
        const { pickupDate, customerName, customerPhone, additionalNotes, productId, productIds, userId } = req.body; // Expect userId

        console.log(req.body);

        if (!pickupDate || !customerName || !customerPhone || !userId) { // userId is now required
            const error = {
                status: 400,
                message: "You are missing required basic pickup information (including userId).",
            };
            return next(error);
        }

        const createPayload = {
            data: {
                pickupDate,
                customerName,
                customerPhone,
                additionalNotes,
                userId: parseInt(userId), // Include userId here
            },
            include: {
                products: true,
                user: { 
                    select: {
                        id: true,
                    } 
                }
                }
        };

        // Handle product associations (as before)
        if (productId) {
            createPayload.data.products = {
                connect: [{ id: parseInt(productId) }],
            };
        } else if (productIds && Array.isArray(productIds) && productIds.length > 0) {
            createPayload.data.products = {
                connect: productIds.map((id) => ({ id: parseInt(id) })),
            };
        }

        const pickup = await prisma.pickup.create(createPayload);
        res.status(201).json(pickup);

    } catch (error) {
        console.error("Error creating pickup:", error);
        next(error);
    }
});

  // Delete pickup
  router.delete("/:id", async (req, res, next) => {
    
    try {
      const id = +req.params.id;
  
      const pickupExists = await prisma.pickup.findUnique({ where: { id } });
      if (!pickupExists) {
        return next({
          status: 404,
          message: `Could not find pickup with id ${id}.`,
        });
      }
  
      await prisma.pickup.delete({ where: { id } });
  
      res.sendStatus(204);
    } catch {
      next();
    }
  });