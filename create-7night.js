const { PrismaClient } = require('./src/generated/client/index.js');
const prisma = new PrismaClient();

async function createPackage() {
  const dmc = await prisma.dMCProfile.findFirst();
  if (!dmc) throw new Error("No DMC found");
  
  const dest = await prisma.destination.findFirst({ where: { name: 'Dubai' } });
  if (!dest) throw new Error("No Dubai destination found");

  // Delete previous instance
  await prisma.package.deleteMany({ where: { title: "Ultimate 7 Nights Dubai Extravaganza" } });

  const pkg = await prisma.package.create({
    data: {
      dmcId: dmc.id,
      destinationId: dest.id,
      title: "Ultimate 7 Nights Dubai Extravaganza",
      destination: "Dubai",
      durationDays: 8,
      durationNights: 7,
      description: "Experience the ultimate week in Dubai with premium desert safaris, luxury dhow cruises, and top-tier accommodations.",
      inclusions: "7 Nights Hotel, Daily Breakfast, Private Airport Transfers, Desert Safari, Dhow Cruise",
      exclusions: "International Flights, Visa Fees, Personal Expenses",
      pricePerPerson: 1899,
      targetNationalities: "All",
      seasonality: "Winter",
      visaRequired: true,
      status: "PUBLISHED",
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', isPrimary: true },
          { url: 'https://images.unsplash.com/photo-1582672060624-95e52ed68c7e', isPrimary: false }
        ]
      }
    }
  });

  // Create Inventory - HOTELS (5 options)
  const hotel3Star = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Rove Downtown', roomType: 'Standard Room', description: 'Modern 3-star hotel near Burj Khalifa.', media: { create: [{ url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', type: 'IMAGE' }] } }
  });
  const hotel3StarCity = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Rove Downtown', roomType: 'City View Room', description: 'Great views of the city skyline.', media: { create: [{ url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', type: 'IMAGE' }] } }
  });
  const hotel3StarFamily = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Rove Downtown', roomType: 'Family Interconnecting', description: 'Two connected rooms for families.', media: { create: [{ url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', type: 'IMAGE' }] } }
  });
  const hotel3StarPremium = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Rove Downtown', roomType: 'Premium Burj View', description: 'Direct views of Burj Khalifa.', media: { create: [{ url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', type: 'IMAGE' }] } }
  });
  const hotel4StarStd = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Marriott Resort Palm', roomType: 'Deluxe Sea View', description: 'Premium 4-star resort.', media: { create: [{ url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d', type: 'IMAGE' }] } }
  });
  const hotel4StarSuite = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Marriott Resort Palm', roomType: 'Executive Suite', description: 'Spacious suite with lounge access.', media: { create: [{ url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f6', type: 'IMAGE' }] } }
  });
  const hotel5StarStd = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Atlantis The Palm', roomType: 'Ocean Room', description: 'Iconic 5-star luxury resort.', media: { create: [{ url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd', type: 'IMAGE' }] } }
  });
  const hotel5StarPalm = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Atlantis The Palm', roomType: 'Palm View Room', description: 'Stunning views of the Palm.', media: { create: [{ url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd', type: 'IMAGE' }] } }
  });
  const hotel5StarImperial = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Atlantis The Palm', roomType: 'Imperial Club Room', description: 'Lounge access and exclusive benefits.', media: { create: [{ url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd', type: 'IMAGE' }] } }
  });
  const hotel5StarTerrace = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Atlantis The Palm', roomType: 'Terrace Suite', description: 'Expansive suite with outdoor terrace.', media: { create: [{ url: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972', type: 'IMAGE' }] } }
  });
  const hotel5StarSuite = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'HOTEL', name: 'Atlantis The Palm', roomType: 'Underwater Suite', description: 'Ultimate luxury with aquarium views.', media: { create: [{ url: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972', type: 'IMAGE' }] } }
  });

  // Create Inventory - TRANSFERS (4 options)
  const sicTransfer = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'TRANSFER', name: 'Shared Coach (SIC)', description: 'Comfortable air-conditioned bus.', media: { create: [{ url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957', type: 'IMAGE' }] } }
  });
  const privateSedan = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'TRANSFER', name: 'Private Sedan', description: 'Standard private car.', media: { create: [{ url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2', type: 'IMAGE' }] } }
  });
  const privateSUV = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'TRANSFER', name: 'Private Luxury SUV', description: 'Chauffeur driven premium SUV.', media: { create: [{ url: 'https://images.unsplash.com/photo-1563720223185-11003d516935', type: 'IMAGE' }] } }
  });
  const limoTransfer = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'TRANSFER', name: 'Stretch Limousine', description: 'VIP Arrival Experience.', media: { create: [{ url: 'https://images.unsplash.com/photo-1587848419616-e5757d97607a', type: 'IMAGE' }] } }
  });

  // Create Inventory - ACTIVITIES (5 options)
  const desertSafari = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'ACTIVITY', name: 'Premium Desert Safari', description: 'Dune bashing and BBQ dinner.', media: { create: [{ url: 'https://images.unsplash.com/photo-1542317855-5dc6c96a3233', type: 'IMAGE' }] } }
  });
  const cityTour = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'ACTIVITY', name: 'Dubai City Tour', description: 'Half-day guided city tour.', media: { create: [{ url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090', type: 'IMAGE' }] } }
  });
  const burjKhalifa = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'ACTIVITY', name: 'Burj Khalifa At The Top', description: 'Entry to 124th floor.', media: { create: [{ url: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c', type: 'IMAGE' }] } }
  });
  const dhowCruise = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'ACTIVITY', name: 'Marina Dhow Cruise Dinner', description: 'Dinner cruise along Dubai Marina.', media: { create: [{ url: 'https://images.unsplash.com/photo-1558509825-78e723927692', type: 'IMAGE' }] } }
  });
  const themePark = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'ACTIVITY', name: 'IMG Worlds of Adventure', description: 'Full day theme park pass.', media: { create: [{ url: 'https://images.unsplash.com/photo-1580226392095-263eb95133ee', type: 'IMAGE' }] } }
  });

  // Breakfast
  const breakfast = await prisma.packageInventoryProduct.create({
    data: { packageId: pkg.id, type: 'RESTAURANT', name: 'International Buffet Breakfast', description: 'Extensive daily breakfast.', media: { create: [{ url: 'https://images.unsplash.com/photo-1495474472207-464a518e1547', type: 'IMAGE' }] } }
  });

  // Create Itinerary Days
  for (let i = 1; i <= 8; i++) {
    const isFirst = i === 1;
    const isLast = i === 8;

    let activityType = cityTour;
    let activityTitle = 'Morning City Tour';
    if (i === 2) { activityType = burjKhalifa; activityTitle = 'Burj Khalifa Visit'; }
    if (i === 3) { activityType = desertSafari; activityTitle = 'Evening Desert Safari'; }
    if (i === 4) { activityType = dhowCruise; activityTitle = 'Dhow Cruise Dinner'; }
    if (i === 5) { activityType = themePark; activityTitle = 'Theme Park Day'; }
    if (i === 6) { activityType = cityTour; activityTitle = 'Old Dubai Tour'; }
    if (i === 7) { activityType = desertSafari; activityTitle = 'Morning Safari'; }

    await prisma.itineraryDay.create({
      data: {
        packageId: pkg.id,
        dayNumber: i,
        title: isFirst ? 'Arrival in Dubai' : isLast ? 'Departure' : `Explore Dubai - Day ${i}`,
        description: 'Enjoy a wonderful day filled with curated activities.',
        items: {
          create: [
            // Hotel (All 5 options)
            ...(!isLast ? [{
              type: 'HOTEL',
              title: 'Overnight Stay',
              optOutDiscount: 100,
              options: {
                create: [
                  { inventoryProductId: hotel3Star.id, isDefault: true, priceAddOn: 0 },
                  { inventoryProductId: hotel3StarCity.id, isDefault: false, priceAddOn: 50 },
                  { inventoryProductId: hotel3StarFamily.id, isDefault: false, priceAddOn: 150 },
                  { inventoryProductId: hotel3StarPremium.id, isDefault: false, priceAddOn: 200 },
                  { inventoryProductId: hotel4StarStd.id, isDefault: false, priceAddOn: 100 },
                  { inventoryProductId: hotel4StarSuite.id, isDefault: false, priceAddOn: 250 },
                  { inventoryProductId: hotel5StarStd.id, isDefault: false, priceAddOn: 400 },
                  { inventoryProductId: hotel5StarPalm.id, isDefault: false, priceAddOn: 550 },
                  { inventoryProductId: hotel5StarImperial.id, isDefault: false, priceAddOn: 700 },
                  { inventoryProductId: hotel5StarTerrace.id, isDefault: false, priceAddOn: 950 },
                  { inventoryProductId: hotel5StarSuite.id, isDefault: false, priceAddOn: 1200 },
                ]
              }
            }] : []),
            // Breakfast
            ...(!isFirst ? [{
              type: 'RESTAURANT',
              title: 'Morning Breakfast',
              time: '07:30',
              optOutDiscount: 20,
              options: {
                create: [
                  { inventoryProductId: breakfast.id, isDefault: true, priceAddOn: 0 }
                ]
              }
            }] : []),
            // Transfer (All 4 options)
            {
              type: 'TRANSFER',
              title: isFirst ? 'Airport Pickup' : isLast ? 'Airport Drop-off' : 'Daily Transfer Service',
              time: isFirst || isLast ? undefined : '09:00',
              optOutDiscount: 30,
              options: {
                create: [
                  { inventoryProductId: privateSUV.id, isDefault: true, priceAddOn: 0 },
                  { inventoryProductId: sicTransfer.id, isDefault: false, priceAddOn: 0 },
                  { inventoryProductId: privateSedan.id, isDefault: false, priceAddOn: 0 },
                  { inventoryProductId: limoTransfer.id, isDefault: false, priceAddOn: 150 },
                ]
              }
            },
            // Activity (All 5 options available, default changes by day)
            ...(!isLast ? [{
              type: 'ACTIVITY',
              title: activityTitle,
              time: '14:00',
              optOutDiscount: 50,
              options: {
                create: [
                  { inventoryProductId: activityType.id, isDefault: true, priceAddOn: 0 },
                  { inventoryProductId: desertSafari.id, isDefault: false, priceAddOn: (activityType.id === desertSafari.id ? 0 : 20) },
                  { inventoryProductId: cityTour.id, isDefault: false, priceAddOn: (activityType.id === cityTour.id ? 0 : -10) },
                  { inventoryProductId: burjKhalifa.id, isDefault: false, priceAddOn: (activityType.id === burjKhalifa.id ? 0 : 50) },
                  { inventoryProductId: dhowCruise.id, isDefault: false, priceAddOn: (activityType.id === dhowCruise.id ? 0 : 30) },
                  { inventoryProductId: themePark.id, isDefault: false, priceAddOn: (activityType.id === themePark.id ? 0 : 80) },
                ].filter((v, i, a) => a.findIndex(t => (t.inventoryProductId === v.inventoryProductId)) === i) // Unique options
              }
            }] : [])
          ]
        }
      }
    });
  }

  console.log("7 Night Package updated successfully with massive options!");
}

createPackage()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
