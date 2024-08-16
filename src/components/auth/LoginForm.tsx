'use client'

import { bodyFont } from "@/config/font"
import { Button } from "../ui/button"
import { IoInformationOutline } from "react-icons/io5"
import { useFormState, useFormStatus } from "react-dom"

import clsx from "clsx"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authenticate } from "@/actions/auth/login"



export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);

  const router = useRouter();
  
  useEffect(()=>{

    //Si todo esta bien accedemos
    if(state==="Success"){
      router.replace('/dashboard/home');
    }

  },[state,router]);

  return (
    <form className="flex flex-col" action={dispatch}>
      <label className={`${bodyFont.className}`} htmlFor="username">Username</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        id="username"
        type="text"
        name="username"
      />


      <label className={`${bodyFont.className}`} htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        id='password'
        type="password"
        name="password"
      />


      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >

        {state === 'CredentialsSignIn' && (
          <div className=" flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Credenciales Incorrecta</p>
          </div>
        )}

      </div>

      <LoginButton />



      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={
        clsx({
          "bg-blue-700 hover:bg-blue-800": !pending,
          "bg-gray-600": pending
        })
      }
      disabled={pending}
    >
      Ingresar
    </Button>
  );
}
