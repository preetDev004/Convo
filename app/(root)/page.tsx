"use client";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import React, { useEffect } from "react";

const RootPage = () => {
  const user = useUser();
  useEffect(() => {
  
    if (user) redirect('/dashboard')
    
  }, [user])
  
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default RootPage;
