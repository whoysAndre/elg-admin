'use server'

import prisma from "@/lib/prisma"
import { Brand, Gender, Product } from "@prisma/client"
import { z } from "zod"
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  code: z.string().min(3).max(255),
  name: z.string().min(3).max(255),
  price: z.coerce
    .number()
    .transform(val => Number(parseFloat(val.toString()).toFixed(0))),
  stock: z.coerce
    .number()
    .int()
    .min(0),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform(val => val.split(',')),
  gender: z.nativeEnum(Gender),
  brands: z.nativeEnum(Brand)
})


export const createUpdateProduct = async (formData: FormData) => {
  
  const data = Object.fromEntries(formData);

  const productParsed = productSchema.safeParse(data);
  

  if ( !productParsed.success) {
    return { ok: false }
  }
  const product = productParsed.data;

  const {id,...rest} = product;


  try {
    const prismaTx = await prisma.$transaction(async(tx)=>{
      let product:Product;
      if(id){
        product = await prisma.product.update({
          where:{
            id
          },
          data:{
            ...rest,
            sizes:{
              set: rest.sizes as string[]
            }
          }
        })
      }else{
        product = await prisma.product.create({
          data:{
            ...rest,
            sizes:{
              set: rest.sizes as string[]
            }
          }
        })
      }

      if(formData.getAll('images')){
        const images = await uploadImages(formData.getAll('images')as File[]);
        if(!images){
          throw new Error('No se pudo cargar las imágenes, rollingback');
        }
        await prisma.productImage.createMany({
          data: images.map(image=>({
            url: image!,
            productId: product.id
          }))
        })
      }

      return{
        product
      }

    });

    revalidatePath('/dashboard/products');

    return{
      ok:true,
      product: prismaTx.product
    }

  } catch (error) { 
    return{
      ok:false,
      message: 'Revisar los logs, no se pudo actualizar/crear'
    }
  }
  
}

const uploadImages = async (images: File[]) => {
  try {

    const uploadPromises = images.map(async (image) => {
      try {

        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
          .then(r => r.secure_url);

      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;


  } catch (error) {
    console.log(error)
    return null;
  }
}