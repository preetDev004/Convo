import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      {/* Mobile navbar */}
      <div className="flex justify-between gap-5 sm:hidden">
        <MobileNav />
      </div>

      {/* logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src={"/icons/logo-2.svg"}
          width={36}
          height={36}
          alt="logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Convo
        </p>
      </Link>

      {/* clerk user management */}
      <div></div>
    </nav>
  );
};

export default Navbar;
