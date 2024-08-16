
import { getCategories } from "@/actions/categories/get-categorie";
import { getProductByCode } from "@/actions/products/get-product-by-code";
import { FormProduct, Title } from "@/components";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Crea tu producto',
  description: 'Creacion de producto',
};

interface Props {
  params: {
    code: string;
  }
}

export default async function NewProductPage({ params }: Props) {

  const { code } = params;

  const [product,categories] = await Promise.all([
    getProductByCode(code),
    getCategories()
  ]);

  if(!product && code !== 'new'){
    redirect('/dashboard/products');
  }

  const title = (code === 'new') ? 'Nuevo producto' : 'Editar producto';


  return (
    <>
      <Title title={title} />

      <FormProduct product={product ?? {}} categories={categories}/>

    </>
  );
}