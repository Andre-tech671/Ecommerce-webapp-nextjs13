import Image from "next/image";
import { Inter } from "next/font/google";
import ProductsCard from "./ProductsCard";
import Stripe from "stripe";

async function getStripeProducts() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const products = await stripe.products.list({
    expand: ['data.default_price'],
  });
  return products.data;
}

export default async function Home() {
  const products = await getStripeProducts();
  console.log(products);
  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product, productIndex) => {
        return (
          <ProductsCard key={productIndex} product={product} />
        );
      })}
    </main>
  );
}
