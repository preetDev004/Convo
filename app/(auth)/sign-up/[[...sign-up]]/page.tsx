import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#007efc37]">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
