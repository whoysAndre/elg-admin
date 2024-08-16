import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from "bcrypt";
import { z } from 'zod';
import prisma from './lib/prisma';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
  },
  //Modificar la informacion del usuario
  callbacks:{

    //Informacion del payload
    jwt({token,user}){
      if(user){
        token.data = user;
      }
      return token;
    },

    //Lo que retorna el token
    session({session,token,user}){

      session.user = token.data as any;
      return session;
    }
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if(!parsedCredentials.success) return null;

        const {username,password} = parsedCredentials.data;
        
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) return null;


        if (!bcrypt.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;

        return rest;
        
      },
    })
  ]
};

export const {signIn,signOut,handlers,auth} = NextAuth(authConfig);