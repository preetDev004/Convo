"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import SearchLoader from "./SearchLoader";


const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls || "You haven't joined any meetings yet!";

      case "upcoming":
        return upcomingCalls || "You don't have any scheduled meetings!";

      case "recordings":
        return recordings || "You don't have any call recordings!";

      default:
        return [];
    }
  };

  const calls = getCalls();
  if (isLoading) {
    return (
      
        <SearchLoader/>

    );
  }
  if (typeof calls === "string") {
    return <h1>{calls}</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((call: Call | CallRecording, index) => (
          <div key={index}>
            <MeetingCard />
          </div>
        ))
      ) : (
        <h1>Nothing to show</h1>
      )}
    </div>
  );
};

export default CallList;
