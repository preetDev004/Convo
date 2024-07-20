import { cn } from "@/lib/utils";
import { Call, CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const MeetingRoom = () => {
  type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipents, setShowParticipents] = useState(false)

  const CallLayout = ()=>{
  switch (layout) {
    case 'grid':
      return <PaginatedGridLayout/>
      
    case 'speaker-right':
      return <SpeakerLayout participantsBarPosition={"left"}/>
      
    default:
      return <SpeakerLayout participantsBarPosition={"right"}/>
  }
  
  }

  return (
    <section className=" relative h-screen w-full pt-4 text-white overflow-hidden">
      <div className="relative flex items-center justify-center size-full">
        <div className="flex size-full items-center max-w-[1000px]">
          <CallLayout/>
        </div>

        <div className={cn("h-[calc(100vh-86px)] hidden ml-2", {
          'show-block': showParticipents
        })}>
          <CallParticipantsList onClose={()=>setShowParticipents(false)}/>
        </div>
      </div>

      <div className="flex fixed bottom-0 w-full items-center justify-center gap-5">
        <CallControls/>
      </div>
    </section>
  );
};



export default MeetingRoom;
