"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date & time.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      // Crypto is global property available with javascript.
      const callId = crypto.randomUUID();
      const call = client.call("default", callId);

      if (!call) throw new Error("Failed while creating a call.");

      const startsAt =
        values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || "Instant Meeting!";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) router.push(`/meeting/${call.id}`);
      toast({
        title: "Meeting Created, Successfully!",
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to create meeting.",
        variant: "destructive",
        duration: 3000,
      });
      console.log("[CREATE_MEETING]", error);
    }
  };
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
