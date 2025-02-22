import Hero from "@/app/components/hero"
import Month_offer from "@/app/components/monthly_offer/monthly_offer"
import ProductPage from "@/app/components/productSection/productPage"

export default function Home() {
  return (
    <div className='flex flex-col justify-center relative items-center w-screen overflow-hidden '>
    <Hero />
    <Month_offer />
    <ProductPage />
</div>
  );
}
