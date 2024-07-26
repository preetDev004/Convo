"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>();
  const { call, isCallLoading } = useGetCallById(params.id);

  if (!isLoaded || isCallLoading) return <Loader />;
  if (!call) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white overflow-hidden">
        <Image
          src={"/images/404.png"}
          width={300}
          height={300}
          alt="Try Again"
        />
        <h3 className="text-base font-semibold">The Meeting was Not Found!</h3>

        <Button
          className="flex gap-2 justify-center items-center br-lg bg-green-600 hover:bg-green-700 px-4 py-2.5"
          onClick={() => {
            router.push("/");
          }}
        >
          <ArrowLeft />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <main className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
