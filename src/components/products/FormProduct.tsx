'use client'
import { bodyFont } from "@/config/font"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Category, Product, ProductImage as ProductWithImage } from "@prisma/client";
import { useForm } from "react-hook-form";
import { sizes } from "@/helpers";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ProductImage } from "./ProductImage";
import Image from "next/image";
import { useRef } from "react";
import { createUpdateProduct } from "@/actions/products/create-update-product";
import { deleteProductImage } from "@/actions/products/delete-product-image";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
}

interface Inputs {
  code: string;
  name: string;
  price: number;
  stock: number;
  sizes: string[];
  brands: string;
  gender: 'women' | 'men' | 'kid' | 'unisex';
  categoryId: string;
  images?: FileList;
}

export const FormProduct = ({ categories, product }: Props) => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      ...product,
      sizes: product.sizes ?? [],
      images: undefined,
      stock: product.stock ?? 0
    },
  });


  watch("sizes");

  const onSizesChange = (size: string) => {
    const currentSizes = getValues('sizes') || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    setValue('sizes', newSizes);
  }

  const onSubmit = async (data: Inputs) => {
    

    const formData = new FormData();
    const { images, ...productToSave } = data;
    if (product.id) {
      formData.append('id', product.id ?? '');
    }
    formData.append('code', productToSave.code);
    formData.append('name', productToSave.name);
    formData.append('price', productToSave.price.toString());
    formData.append('stock', productToSave.stock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('brands', productToSave.brands);
    formData.append('gender', productToSave.gender);
    formData.append('categoryId', productToSave.categoryId);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const {ok, product:updateProduct} = await createUpdateProduct(formData);

    if ( !ok ) {
      alert('Producto no se pudo actualizar');
      return;
    }


    router.replace(`/dashboard/products`);

  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">

          {/* COLUMN 1 */}
          <div className="col-span-1 flex flex-col gap-4">

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="code" className={`${bodyFont.className}`}>Código</Label>
              <Input {...register('code', { required: true })} type="text" id="code" placeholder="Código" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name" className={`${bodyFont.className}`}>Nombre</Label>
              <Input {...register('name', { required: true })} type="text" id="name" placeholder="Título del producto" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="stock" className={`${bodyFont.className}`}>Stock</Label>
              <Input {...register('stock', { required: true,min:0 })} type="text" id="stock" placeholder="Cantidad" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="price" className={`${bodyFont.className}`}>Precio</Label>
              <Input {...register('price', { required: true,min:0 })} type="text" id="price" placeholder="Precio" />
            </div>

            <div className="flex flex-col mb-2 gap-1.5">

              <Label htmlFor="gender" className={`${bodyFont.className}`}>Género</Label>
              <select {...register('gender',{required:true})} className="p-2 border rounded-md bg-white w-full lg:w-[385px]" id="gender">
                <option value="">[Seleccione]</option>
                <option value="men">hombre</option>
                <option value="women">mujer</option>
                <option value="kid">niña(a)</option>
                <option value="unisex">unisex</option>
              </select>
            </div>

            <div className="flex flex-col mb-2 gap-1.5">
              <Label htmlFor="gender" className={`${bodyFont.className}`}>Marca</Label>
              <select {...register('brands',{required:true})} className="p-2 border rounded-md bg-white w-full lg:w-[385px]" id="gender">
                <option value="">[Seleccione]</option>
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
                <option value="puma">Puma</option>
                <option value="reebok">Reebok</option>
              </select>
            </div>

            <div className="flex flex-col mb-2 gap-1.5">
              <Label htmlFor="category" className={`${bodyFont.className}`}>Categoría</Label>
              <select {...register('categoryId',{required:true})} className="p-2 w-full lg:w-[385px] border rounded-md bg-white" id="category">
                <option value="">[Seleccione]</option>
                

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* COLUMN 2 */}
          <div className="col-span-1 flex flex-col gap-4">
            <div className="">
              <Label htmlFor="size" className={`${bodyFont.className}`}>Tallas</Label>
              <div className="flex flex-wrap">
                {
                  sizes.map((size) => (
                    <div
                      key={size}
                      onClick={() => onSizesChange(size)}
                      className={clsx(
                        "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                        {
                          "bg-blue-500 text-white": getValues("sizes").includes(size),
                        }
                      )}
                    >
                      <span>{size}</span>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="image">Imágen</Label>
              <Input
                id="image"
                type="file"
                multiple
                accept="image/png, image/jpeg, image/avif"
                {...register('images',{required:false})}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              {
                product.ProductImage?.map((image)=>(
                  <div key={image.id}>
                    <Image
                      alt={product.name ?? ""}
                      src={image.url}
                      width={300}
                      height={300}
                      className="rounded-t shadow-md"
                    />

                    <button
                      type="button"
                      className="btn-danger w-full rounded-b-xl"
                      onClick={()=> deleteProductImage(image.id,image.url)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              }
            </div>

          </div>

        </div>
      
        <input type="submit" className="btn-primary w-full mt-6" value="Guardar"/>

      </form>

    </>
  )
}
