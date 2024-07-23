"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation"

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error("useCall hook must be called under StreamCall component.");

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const isCallEnded = useCallEndedAt();
  if (!!isCallEnded) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white overflow-hidden">
        <h3> The Meeting has ended!</h3>

        <Button
          className="flex gap-2 justify-center items-center br-lg bg-green-600 hover:bg-green-700 px-4 py-2.5"
          onClick={() => {
            setIsMicCamToggledOn(true)
            router.push("/")
          }}
        >
          <ArrowLeft />
          Go Back
        </Button>
      </div>
    );
  }

  console.log(Math.floor(((callStartsAt?.getTime() || (new Date()).getTime()) - (new Date()).getTime()) / 60000));
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white overflow-hidden">
      <h1 className="text-2xl font-bold">Setup Your Audio/Vdeo</h1>
      <VideoPreview className="flex max-w-[95%] sm:min-w-[70%] md:min-w-[60%] xl:min-w-[50%] sm:min-h-[450px] h-auto flex-col items-center justify-center rounded-md" />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            className="custom-checkbox"
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join without Audio and Video
        </label>

        <DeviceSettings />
      </div>
      <Button
        className="br-lg bg-green-600 hover:bg-green-700 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
