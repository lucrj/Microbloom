// prisma/seed.ts
import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL in .env");
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  await prisma.service.upsert({
    where: { slug: "grow-lab-setup" },
    update: {},
    create: {
      slug: "grow-lab-setup",
      title: "Grow Lab & Farm Setup",
      description:
        "Turnkey grow lab installations, school labs, and commercial consultancy",
    },
  });

  await prisma.course.upsert({
    where: { slug: "microgreens-masterclass" },
    update: {},
    create: {
      slug: "microgreens-masterclass",
      title: "Microgreens Farming Masterclass",
      description: "Starter to advanced microgreens business course",
      duration: 14,
      fees: 5000,
      eligibility: "Open for all",
      curriculum: ["Introduction to Microgreens", "Cultivation & Harvesting", "Business & Marketing"],
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Radish Microgreens",
        slug: "radish-microgreens",
        description: "Spicy and crisp radish microgreens, packed with nutrients.",
        category: "microgreens",
      },
      {
        name: "Wheatgrass Fresh",
        slug: "wheatgrass-fresh",
        description: "Freshly harvested wheatgrass, perfect for juicing.",
        category: "wheatgrass",
      },
    ],
      skipDuplicates: true,
    });
  
   /* ======================
     INTERNSHIPS
  ====================== */
  await prisma.internship.createMany({
    data: [
      {
        title: "Microgreens Production Internship",
        description:
          "Hands-on internship covering microgreens cultivation, harvesting, and packaging.",
        location: "Gandhinagar",
        stipend: 8000,
        duration: 3, // months
      },
      {
        title: "Urban Farming Internship",
        description:
          "Learn sustainable urban farming techniques and greenhouse operations.",
        location: "Ahmedabad",
        stipend: 6000,
        duration: 2,
      },
      {
        title: "AgriTech Research Internship",
        description:
          "Assist in research projects involving sensors, data collection, and modern agriculture.",
        location: "Remote",
        stipend: null, // unpaid / stipend TBD
        duration: 4,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
