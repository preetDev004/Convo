"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import { Input } from "./ui/input";

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
          duration: 2500,
        });
        return;
      }
      if (!values.description && meetingState === "isScheduledMeeting") {
        toast({
          title: "Please Provide Description!",
          variant: "destructive",
          duration: 2500,
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
      console.log(
        Math.floor(
          ((values.dateTime?.getTime() || new Date().getTime()) -
            new Date().getTime()) /
            60000
        )
      );

      if (
        Math.floor(
          ((values.dateTime?.getTime() || new Date().getTime()) -
            new Date().getTime()) /
            60000
        ) < 0 &&
        values.description
      ) {
        toast({
          title: "Please select the Future Date-Time.",
          variant: "destructive",
          duration: 2500,
        });
        return;
      }
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
        title:
          meetingState === "isInstantMeeting"
            ? "Meeting Created, Successfully!"
            : "Meeting Scheduled, Successfully!",
        variant: "success",
        duration: 2500,
      });
    } catch (error) {
      toast({
        title: "Failed to create meeting.",
        variant: "destructive",
        duration: 2500,
      });
      console.log("[CREATE_MEETING]", error);
    }
  };
  const meetingLink = ` ${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          title={"Schedule a meeting for future!"}
          onClose={() => setMeetingState(undefined)}
          className="text-center"
          btnText="Schedule Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              {" "}
              Add a description
            </label>
            <Textarea
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
              className="border-none bg-dark-3 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              {" "}
              Meeting Date-Time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              placeholderText="Select a Date & Time"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          title={"Meeting Scheduled!"}
          onClose={() => setMeetingState(undefined)}
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied!",
              variant: "success",
              duration: 2500,
            });
          }}
          img="/icons/checked.svg"
          btnIcon="/icons/copy.svg"
          btnText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        title={"Starting an instant meeting?"}
        onClose={() => setMeetingState(undefined)}
        className="text-center"
        btnText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        title={"Provide meeting link to join."}
        onClose={() => setMeetingState(undefined)}
        className="text-center"
        btnText="Join Meeting"
        handleClick={() => {
          router.push(values.link)
        }}
      >
        <Input
          onChange={(e) => {
            setValues({ ...values, link: e.target.value });
          }}
          className="border-none bg-dark-3 rounded focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
          placeholder="Enter meeting link"
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
