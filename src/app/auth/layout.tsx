


export const metadata = {
  title: 'auth | elegant',
  description: 'SEO Title',
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="w-full sm:w-[350px] px-10">
        {children}
      </div>
    </main>
  );
}