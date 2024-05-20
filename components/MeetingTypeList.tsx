"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const router = useRouter();

  const createMeeting = () => {};
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        title="New Meeting"
        desc="Start an instant meeting"
        bgColor="bg-orange-1"
        icon="/icons/add-meeting.svg"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        title="Schedule Meeting"
        desc="Schedule a meeting for future"
        bgColor="bg-green-1"
        icon="/icons/schedule.svg"
        handleClick={() => setMeetingState("isScheduledMeeting")}
      />
      <HomeCard
        title="View Recordings"
        desc="See your meetings recordings"
        bgColor="bg-purple-1"
        icon="/icons/recordings.svg"
        handleClick={() => router.push("/recordings")}
      />
      <HomeCard
        title="Join Meeting"
        desc="Via invitation link"
        bgColor="bg-yellow-1"
        icon="/icons/join-meeting.svg"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        title={"Starting an instant meeting?"}
        onClose={() => setMeetingState(undefined)}
        className="text-center"
        btnText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
