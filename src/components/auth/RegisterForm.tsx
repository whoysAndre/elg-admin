'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { bodyFont } from "@/config/font"
import clsx from "clsx"
import Link from "next/link"
import { Button } from "../ui/button"
import { registerAction } from "@/actions/auth/register"

type Inputs = {
  name: string;
  username: string;
  password: string;
}

export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    
    const {username,name,password} = data;
    const resp = await registerAction({username,name,password});

    if(!resp.ok){
      setErrorMessage(resp.message);
      return;
    }

    window.location.replace('/');

  }

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        <label className={`${bodyFont.className}`} htmlFor="name">Nombre</label>
        <input
          className={
            clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5",
              {
                'border-red-500': errors.name
              }
            )
          }
          id='name'
          type="text"
          autoFocus
          {...register('name', { required: true })}

        />

        <label className={`${bodyFont.className}`} htmlFor="username">Usuario</label>
        <input
          className={
            clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5",
              {
                'border-red-500': errors.username
              }
            )
          }
          id='username'
          type="username"
          {...register('username', { required: true})}
        />


        <label className={`${bodyFont.className}`} htmlFor="password">Contraseña</label>
        <input
          className={
            clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5",
              {
                'border-red-500': errors.password
              }
            )
          }
          id='password'
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />

        {/* <span className="text-red-500">{errorMessage}</span> */}

        <Button
          className="bg-blue-700 hover:bg-blue-800">
          Crear cuenta
        </Button>


        {/* divisor line */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login"
          className={`btn-secondary text-center ${bodyFont.className}`}>
          Volver
        </Link>

      </form>
    </>
  )
}
