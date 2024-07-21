import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Convvo",
  description: "A Simple web Video & Audio Conferencing app with all the needed features.",
  icons:{
    icon: '/icons/logo-2.svg'
  }
};
const RootLayout = ({ children }: { children: ReactNode }) => {

  
  return (
    <StreamVideoProvider>
      <main>{children}</main>
    </StreamVideoProvider>
  );
};

export default RootLayout;
