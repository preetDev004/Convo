import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutListIcon, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CallEndButton from "./CallEndButton";
import Loader from "./Loader";

const MeetingRoom = () => {
  const router = useRouter();
  // const serarchPaarams = useSearchParams();

  // const isPersonalRoom = !!serarchPaarams.get("personal");

  type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");

  const [showParticipents, setShowParticipents] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      router.push("/");
    }
  }, [callingState, router]);

  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;

      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;

      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-between gap-5 h-screen w-full pt-4 text-white overflow-hidden ">
      <div className="w-full flex items-center justify-center gap-4">
        <CallStatsButton />
        <DropdownMenu>
          <div className="flex items-center str-video__call-controls__button w-10 h-10 p-2 justify-center rounded-lg">
            <DropdownMenuTrigger className="cursor-pointer ">
              <LayoutListIcon size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white rounded-xl p-2 m-4">
            {["Grid", "Speaker-left", "Speaker-right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer d-menu-item"
                  onClick={() => {
                    // to let typescript know that we are passing CallLayout type value
                    setLayout(item.toLowerCase() as CallLayoutType);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button onClick={() => setShowParticipents((prev) => !prev)}>
          <div className=" cursor-pointer rounded-xl flex items-center str-video__call-controls__button w-10 h-10 p-2 justify-center">
            <Users size={20} className="text-white" />
          </div>
        </button>

        <CallEndButton />
      </div>

      <div className="relative flex items-center justify-center size-full  ">
        <div className="flex size-full items-center max-w-[1000px] overflow-hidden">
          <CallLayout />
        </div>

        <div
          className={cn(
            "h-[calc(100vh-86px)] hidden ml-2 right-2 absolute z-50 ",
            {
              "show-block": showParticipents,
            }
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipents(false)} />
        </div>
      </div>

      <CallControls
        onLeave={async () => {
          router.push("/");
        }}
      />
    </section>
  );
};

export default MeetingRoom;
