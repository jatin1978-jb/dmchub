const { PrismaClient } = require('./src/generated/client/index.js');
const prisma = new PrismaClient();

async function run() {
  const p = await prisma.package.findFirst({
    where: { title: 'Ultimate 7 Nights Dubai Extravaganza' },
    include: {
      itineraryDays: {
        include: {
          items: {
            include: {
              options: {
                include: {
                  inventoryProduct: true
                }
              }
            }
          }
        }
      }
    }
  });
  
  if (!p) {
    console.log("Package not found");
    return;
  }
  
  for (const day of p.itineraryDays) {
    const hotelItem = day.items.find(i => i.type === 'HOTEL');
    if (hotelItem) {
      console.log(`Day ${day.dayNumber} Hotel Options:`);
      hotelItem.options.forEach(o => {
        console.log(`- ${o.inventoryProduct.name} (${o.inventoryProduct.roomType})`);
      });
      break; // Just check the first day with a hotel
    }
  }
}

run();
