import { bodyFont } from "@/config/font";

interface Props{
  title: string,
  subtitle?:string,
  className?:string 
}

export const Title = ({title, subtitle, className}:Props) => {
  return (
    <>
      <h1 className={`${bodyFont.className} antialiased font-semibold capitalize text-3xl`}>
        {title}
      </h1>
      {
        subtitle && (
          <h3 className={`${bodyFont.className} text-xl mb-5 font-normal`}>{subtitle}</h3>
        )
      }
    </>
  );
};
