'use server'

import bcrypt from "bcrypt";
import { RegisterUser } from "@/interfaces"
import prisma from "@/lib/prisma";

export const registerAction = async (user: RegisterUser) => {


  try {
    const { password, ...detailUser } = user;

    const passwordHashed = await bcrypt.hash(password, 10);

    const userRegister = await prisma.user.create({
      data: {
        ...detailUser,
        password: passwordHashed
      },
      select: {
        id: true,
        name: true,
        username: true
      }
    })

    return {
      ok: true,
      user: userRegister,
      message: 'Usuario creado'
    }
  } catch (error) {

    return {
      ok: false,
      message: 'No se pudo crear usuario'
    }
    
  }



}