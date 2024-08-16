import { LoginForm } from "@/components";
import { bodyFont } from "@/config/font";

export default function LoginPage() {
  return (
    <div>
      <div className="flex flex-col min-h-screen pt-48 sm:pt-36">

        <h1 className={`${bodyFont.className} text-4xl mb-5 text-center`}>Ingresar</h1>
        
        <LoginForm/>
       
      </div>
    </div>
  );
}