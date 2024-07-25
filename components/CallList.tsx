"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import SearchLoader from "./SearchLoader";
import { toast } from "./ui/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;

      case "upcoming":
        return upcomingCalls;

      case "recordings":
        return recordings;

      default:
        return [];
    }
  };
  const getNoCallsMsg = () => {
    switch (type) {
      case "ended":
        return "You haven't joined any meetings yet!";

      case "upcoming":
        return "You don't have any scheduled meetings!";

      case "recordings":
        return "You don't have any call recordings!";

      default:
        return "Nothing to show";
    }
  };

  const calls = getCalls();
  const noCallsMsg = getNoCallsMsg();
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings.reverse());
      } catch (error: any) {
        if (error?.response && error?.response?.status === 404) {
          toast({
            title: "Recordings not found. Please try again later.",
            variant: "default",
            duration: 2500,
          });
        } else {
          toast({
            title: "An unexpected error occurred. Please try again later.",
            variant: "destructive",
            duration: 2500,
          });
        }
      }
    };
    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings]);

  if (isLoading) {
    return <SearchLoader />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index) => (
          <MeetingCard
            key={
              (meeting as Call)?.id ||
              (meeting as CallRecording).filename.substring(0, 20) ||
              index
            }
            title={
              (meeting as Call).state?.custom.description.substr(0, 20) ||
              (meeting as CallRecording).filename.substring(0, 20) ||
              "No Description"
            }
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recording.svg"
            }
            isPreviousMeeting={type === "ended"}
            date={
              (meeting as Call).state?.startsAt ||
              new Date((meeting as CallRecording)?.start_time)
            }
            btnIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            btnText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push((meeting as CallRecording)?.url)
                : () => router.push(`/meeting/${(meeting as Call)?.id}`)
            }
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
          />
        ))
      ) : (
        <h1>{noCallsMsg}</h1>
      )}
    </div>
  );
};

export default CallList;
