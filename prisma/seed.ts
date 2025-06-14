import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // seed category
  const category = await prisma.productCategory.create({
    data: {
      name: "Minuman",
    },
  });

  // seed produk
  const product = await prisma.product.create({
    data: {
      name: "Es Teh Manis",
      price: 5000,
      stock: 100,
      categoryId: category.id,
    },
  });

  const variant = await prisma.productVariant.createMany({
    data: [
      { name: "Dingin", price: 5000, productId: product.id },
      { name: "Hangat", price: 5000, productId: product.id },
    ],
  });

  console.log("Seed successfully!: ", category, product, variant);
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
