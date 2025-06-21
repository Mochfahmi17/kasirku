import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // seed category
  const makanan = await prisma.productCategory.create({
    data: {
      name: "Makanan",
    },
  });

  // seed produk
  const product = await prisma.product.create({
    data: {
      name: "Nasi Goreng",
      image:
        "https://asset.kompas.com/crops/U6YxhTLF-vrjgM8PN3RYTHlIxfM=/84x60:882x592/1200x800/data/photo/2021/11/17/61949959e07d3.jpg",
      price: 13000,
      stock: 50,
      categoryId: makanan.id,
    },
  });

  // Seed variant
  const variant = await prisma.productVariant.createMany({
    data: [
      { name: "Original", price: 13000, productId: product.id },
      { name: "Special", price: 17000, productId: product.id },
    ],
  });

  console.log("Seed successfully!: ", makanan, product, variant);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
