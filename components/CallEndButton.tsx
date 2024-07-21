"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { PhoneOff } from "lucide-react";

const CallEndButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.push("/");
      }}
      className="bg-red-500 rounded-xl end-meeting"
    >
        <div className="flex gap-2 items-center justify-center">
            <PhoneOff className="w-5 h-5"/>
            <span>End Meeting</span>
        </div>
        
    </Button>
  );
};

export default CallEndButton;
