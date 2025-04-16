const prisma = require("../prisma");
const seed = async () => {
    const createUsers = async () => {
        const users = [
            {email: "test@gmail.com", password: "testing"}
        ]
        await prisma.user.createMany({data: users});
    };
    
    const createPickUps = async () => {
        const pickUps = [
            {pickupDate: new Date ("2025-04-17"), customerName: "Abigail", customerPhone: "(714) 487-6154", additionalNotes: "Customer will call to see if will do delivery or not tomorrow", userId: 1 },
            {pickupDate: new Date ("2025-04-17"), customerName: "Randy", customerPhone: "(714) 768-5164", additionalNotes: "Customer will try to come tomorrow", userId: 1 },
            {pickupDate: new Date ("2025-04-17"), customerName: "Tanya", customerPhone: "(714) 444-2232", additionalNotes: "Customer might need a third day", userId: 1 },
            {pickupDate: new Date ("2025-04-17"), customerName: "Jose", customerPhone: "(714) 323-6678", userId: 1 }
        ]
        await prisma.pickup.createMany({data: pickUps});
    };

    const createDeliveries = async () => {
        const deliveries = [
            {deliveryDate: new Date ("2025-04-20"), customerName: "Isabel", customerPhone: "(714) 676-2243", customerAddress: "1234 Main St Long Beach, CA 90714", additionalNotes: "Customer says pin to get in is 5432", userId: 1 },
            {deliveryDate: new Date ("2025-04-20"), customerName: "Perry", customerPhone: "(714) 878-9876", customerAddress: "9876 Pine St Long Beach, CA 90715", additionalNotes: "Customer will need early afternoon", userId: 1 },
            {deliveryDate: new Date ("2025-04-20"), customerName: "Gilbert", customerPhone: "(714) 890-0954", customerAddress: "6785 Jeweler St Torrance, CA 90721", additionalNotes: "Customer says leave outside is fine", userId: 1 },
            {deliveryDate: new Date ("2025-04-20"), customerName: "Samantha", customerPhone: "(714) 371-5639", customerAddress: "5678 Grand Ave Long Beach, CA 90716", userId: 1 }
        ]
        await prisma.delivery.createMany({data: deliveries});
    };

    const createProducts = async () => {
        const products = [
            {title: "Brown Couch", description: "large sectional with ottoman", imageUrl: "https://m.media-amazon.com/images/I/917MSMou4ZL._AC_UF894,1000_QL80_.jpg", pickupId: 1},
            {title: "Yellow Table", description: "Comes with four chairs", imageUrl: "https://s1.img.bidsquare.com/item/l/2554/25542053.jpeg?t=1RSByC", pickupId: 2},
            {title: "Tall Brown Dresser", description: "Has five drawers", imageUrl: "https://images.thdstatic.com/productImages/fb594aa6-95db-445c-8ef3-13849b9e7ded/svn/dark-cherry-brown-benjara-chest-of-drawers-bm284310-64_600.jpg", pickupId: 3},
            {title: "Black Nightstand", description: "Small with 3 drawers", imageUrl: "https://images.thdstatic.com/productImages/bf23be1d-4114-43bf-8e2c-ea7020e41e97/svn/black-polibi-nightstands-rs-mwdesw-b-64_1000.jpg", pickupId: 4},
            {title: "Glass Table", description: "Comes with 4 chairs", imageUrl: "https://modern1furniture.com/wp-content/uploads/2019/07/products-01_ESF_2061_Glass_Dining_Table_with_6138_Dining_Chairs.jpg", deliveryId: 1},
            {title: "Coffee Table", description: "Circular", imageUrl: "https://oakfurniturestore.com.au/cdn/shop/files/anders-natural-solid-oak-coffee-table-set-387890.jpg?v=1723659929", deliveryId: 2},
            {title: "Fridge", description: "Silver LG", imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2024/09/BEST-REFRIGERATOR-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024", deliveryId: 3},
            {title: "Washing Machine", description: "Samsung White and Black", imageUrl: "https://hips.hearstapps.com/hmg-prod/images/best-washing-machines-6580810397efc.png?crop=0.405xw:0.811xh;0.300xw,0.0962xh&resize=640:*", deliveryId: 4}
        ]
        await prisma.product.createMany({data: products});
    };


await createUsers();
await createPickUps();
await createDeliveries();
await createProducts();

};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });