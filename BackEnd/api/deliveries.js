const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

//get list of all deliveries
router.get("/", async (req, res, next) => {
    try {
        const deliveries = await prisma.delivery.findMany({
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
        res.json(deliveries)
    } catch (error) {
        next();
    }
})

 // Get a specific delivery
 router.get("/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
  
      const delivery = await prisma.delivery.findUnique(
        { 
            where: { id },
            include: {
                products: {
                  select: {
                    title: true,
                    description: true,
                    imageUrl: true,
                    id: true,
                  },
                },
              },
        
        
        });
  
      if (!delivery) {
        return next({
          status: 404,
          message: `Could not find delivery with id ${id}.`,
        });
      }
  
      res.json(delivery);
    } catch {
      next();
    }
  });

  //Create new delivery

router.post("/", async (req, res, next) => {
    try {
        const { deliveryDate, customerName, customerPhone, customerAddress, additionalNotes, productId, productIds, userId } = req.body; // Expect userId

        console.log(req.body);

        if (!deliveryDate || !customerName || !customerPhone || !customerAddress || !userId) { // userId is now required
            const error = {
                status: 400,
                message: "You are missing required basic delivery information (including userId).",
            };
            return next(error);
        }

        const createPayload = {
            data: {
                deliveryDate,
                customerName,
                customerPhone,
                customerAddress,
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

        const delivery = await prisma.delivery.create(createPayload);
        res.status(201).json(delivery);

    } catch (error) {
        console.error("Error creating delivery:", error);
        next(error);
    }
});

// Delete pickup
router.delete("/:id", async (req, res, next) => {
    
    try {
      const id = +req.params.id;
  
      const deliveryExists = await prisma.delivery.findUnique({ where: { id } });
      if (!deliveryExists) {
        return next({
          status: 404,
          message: `Could not find delivery with id ${id}.`,
        });
      }
  
      await prisma.delivery.delete({ where: { id } });
  
      res.sendStatus(204);
    } catch {
      next();
    }
  });