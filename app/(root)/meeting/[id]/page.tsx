"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import {  StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>();
  const { call, isCallLoading } = useGetCallById(params.id);


  if (!isLoaded || isCallLoading) return <Loader />;

  
  return (
    <main className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete}/> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
