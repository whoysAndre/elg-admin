
import { columns, DataTable } from "@/components";
import { bodyFont } from "@/config/font";
import prisma from "@/lib/prisma";


export const metadata = {
  title: 'Ver mis productos',
  description: 'Pagina para ver todos los productos',
};



export default async function ProductsPage() {


  const productsWithCategories = await prisma.product.findMany({
    include: {
      category: true, // Esto incluirá la información de la categoría
      ProductImage:true
    }
  });

  const products = productsWithCategories.map(product => ({
    code: product.code,
    name: product.name,
    stock: product.stock,
    price: product.price,
    sizes: product.sizes,
    brands: product.brands,
    category: product.category.name,
    image: product.ProductImage[0]?.url || ""
  }));

  return (
    <>

      <h1 className={`capitalize text-2xl ${bodyFont.className} font-semibold`}>Todos mis productos</h1>


      <DataTable columns={columns} data={products} />

    </>
  );
}