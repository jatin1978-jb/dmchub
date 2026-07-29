import { PrismaClient } from '../src/generated/client/index.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding marketplace data...')

  // Clean up existing data to avoid conflicts with new schema
  console.log('Cleaning existing data...')
  await prisma.payment.deleteMany({})
  await prisma.traveler.deleteMany({})
  await prisma.booking.deleteMany({})
  await prisma.hold.deleteMany({})
  await prisma.packageImage.deleteMany({})
  await prisma.itineraryItemOption.deleteMany({})
  await prisma.itineraryItem.deleteMany({})
  await prisma.itineraryDay.deleteMany({})
  await prisma.packageInventoryMedia.deleteMany({})
  await prisma.packageInventoryProduct.deleteMany({})
  await prisma.package.deleteMany({})
  await prisma.destination.deleteMany({})
  await prisma.dMCProfile.deleteMany({})
  await prisma.user.deleteMany({ where: { role: 'DMC' } })

  console.log('Creating Destinations...')
  const destinationsData = [
    { name: 'Dubai', countryCode: 'AE', heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', visaProcessingDays: 3, visaType: 'E-Visa' },
    { name: 'Thailand', countryCode: 'TH', heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a', visaProcessingDays: 0, visaType: 'Visa Free' },
    { name: 'Singapore', countryCode: 'SG', heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd', visaProcessingDays: 0, visaType: 'Visa Free' },
    { name: 'Maldives', countryCode: 'MV', heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8', visaProcessingDays: 0, visaType: 'Visa on Arrival' },
    { name: 'United Kingdom', countryCode: 'GB', heroImage: 'https://images.unsplash.com/photo-1513635269975-5969336ac1cb', visaProcessingDays: 15, visaType: 'Visa Required' },
    { name: 'United States', countryCode: 'US', heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', visaProcessingDays: 30, visaType: 'Visa Required' },
    { name: 'France', countryCode: 'FR', heroImage: 'https://images.unsplash.com/photo-1502602898657-3e9076113824', visaProcessingDays: 20, visaType: 'Visa Required' },
  ]

  const destinations = []
  for (const dest of destinationsData) {
    const created = await prisma.destination.create({ data: dest })
    destinations.push(created)
  }

  console.log('Creating DMCs...')
  const dmcUsers = []
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: `dmc${i}@example.com`,
        passwordHash: 'dummyhash',
        role: 'DMC',
        status: 'ACTIVE',
        dmcProfile: {
          create: {
            companyName: `Premium DMC ${i}`,
            contactPerson: `Contact ${i}`,
            phone: '+123456789',
            country: 'Global',
            address: '123 Main St',
          }
        }
      },
      include: { dmcProfile: true }
    })
    dmcUsers.push(user)
  }

  console.log('Creating Packages...')
  let packageCount = 0
  const basePackages = [
    { title: 'Luxury Escape', durationDays: 4, durationNights: 3, price: 599 },
    { title: 'Family Adventure', durationDays: 6, durationNights: 5, price: 899 },
    { title: 'Honeymoon Retreat', durationDays: 8, durationNights: 7, price: 1499 },
    { title: 'City Explorer', durationDays: 5, durationNights: 4, price: 799 },
  ]

  for (const dest of destinations) {
    for (const base of basePackages) {
      if (packageCount >= 25) break;

      const randomDmc = dmcUsers[Math.floor(Math.random() * dmcUsers.length)].dmcProfile!
      
      const pkg = await prisma.package.create({
        data: {
          dmcId: randomDmc.id,
          destinationId: dest.id,
          title: `${dest.name} ${base.title}`,
          destination: dest.name,
          durationDays: base.durationDays,
          durationNights: base.durationNights,
          description: `Enjoy an amazing ${base.durationNights}-night stay in ${dest.name}.`,
          inclusions: 'Hotel, Transfers, Breakfast',
          exclusions: 'Flights, Visa fees',
          pricePerPerson: base.price,
          targetNationalities: 'All',
          seasonality: 'Year-round',
          visaRequired: dest.visaType === 'Visa Required',
          status: 'PUBLISHED',
          images: {
            create: [{ url: dest.heroImage!, isPrimary: true }]
          }
        }
      })

      // Create Inventory Products
      const hotel4Star = await prisma.packageInventoryProduct.create({
        data: {
          packageId: pkg.id,
          type: 'HOTEL',
          name: 'Standard 4-Star Hotel',
        }
      })
      const hotel5Star = await prisma.packageInventoryProduct.create({
        data: {
          packageId: pkg.id,
          type: 'HOTEL',
          name: 'Premium 5-Star Resort',
        }
      })
      const sicTransfer = await prisma.packageInventoryProduct.create({
        data: {
          packageId: pkg.id,
          type: 'TRANSFER',
          name: 'SIC Shared Transfer',
        }
      })
      const privateTransfer = await prisma.packageInventoryProduct.create({
        data: {
          packageId: pkg.id,
          type: 'TRANSFER',
          name: 'Private Sedan Transfer',
        }
      })
      const cityTour = await prisma.packageInventoryProduct.create({
        data: {
          packageId: pkg.id,
          type: 'ACTIVITY',
          name: 'Group Tour (SIC)',
        }
      })
      const vipTour = await prisma.packageInventoryProduct.create({
        data: {
          packageId: pkg.id,
          type: 'ACTIVITY',
          name: 'Private Guided Tour',
        }
      })

      // Create Itinerary Days
      for (let i = 0; i < base.durationDays; i++) {
        const isFirstDay = i === 0;
        const isLastDay = i === base.durationDays - 1;

        await prisma.itineraryDay.create({
          data: {
            packageId: pkg.id,
            dayNumber: i + 1,
            title: isFirstDay ? 'Arrival & Welcome' : isLastDay ? 'Departure' : `Explore ${dest.name} - Day ${i + 1}`,
            description: `Enjoy a wonderful day filled with curated activities in ${dest.name}.`,
            items: {
              create: [
                {
                  type: 'HOTEL',
                  title: 'Overnight Stay',
                  options: {
                    create: [
                      { inventoryProductId: hotel4Star.id, isDefault: true, priceAddOn: 0 },
                      { inventoryProductId: hotel5Star.id, isDefault: false, priceAddOn: 150 },
                    ]
                  }
                },
                {
                  type: isFirstDay || isLastDay ? 'TRANSFER' : 'ACTIVITY',
                  title: isFirstDay ? 'Airport Pickup' : isLastDay ? 'Airport Drop-off' : 'Guided City Tour',
                  time: isFirstDay ? 'Morning/Afternoon' : '09:00 AM',
                  options: {
                    create: isFirstDay || isLastDay ? [
                      { inventoryProductId: sicTransfer.id, isDefault: true, priceAddOn: 0 },
                      { inventoryProductId: privateTransfer.id, isDefault: false, priceAddOn: 60 }
                    ] : [
                      { inventoryProductId: cityTour.id, isDefault: true, priceAddOn: 0 },
                      { inventoryProductId: vipTour.id, isDefault: false, priceAddOn: 60 }
                    ]
                  }
                }
              ]
            }
          }
        })
      }

      packageCount++
    }
  }

  console.log(`Seed complete! Created ${destinations.length} destinations, ${dmcUsers.length} DMCs, and ${packageCount} packages.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
