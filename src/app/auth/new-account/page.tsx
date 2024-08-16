import { RegisterForm } from "@/components";
import { bodyFont } from "@/config/font";

export default function CreateAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-28">

      <h1 className={`${bodyFont.className} text-4xl mb-5`}>Nueva cuenta</h1>

      <RegisterForm/>

    </div>
  );
}