"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useUser } from "@clerk/nextjs";
import { Call } from "@stream-io/video-react-sdk";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const [upcomingCall, setUpcomingCall] = useState<Call | undefined>();
  const { upcomingCalls } = useGetCalls();
  const user = useUser();

  useEffect(() => {
    setUpcomingCall(upcomingCalls[0]);
    const interval = setInterval(() => {
      setDate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [upcomingCalls]);

  const callTime =
    upcomingCall?.state?.startsAt &&
    upcomingCall?.state?.startsAt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const fmtDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(date);

  const heroStr =
    (user?.user?.firstName?.length && user?.user?.firstName?.length > 15
      ? user.user?.firstName?.substring(0, 15) + "..."
      : user.user?.firstName) || "Start seemless calling with Convvo";

  return (
    <div className="flex flex-col justify-between h-full px-5 py-8 lg:p-11">
      {upcomingCalls && upcomingCalls.length > 0 ? (
        <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base">
          Upcoming Meeting at:{" "}
          <Link className="hover:underline" href={"/upcoming"}>
            {callTime}
          </Link>
        </h2>
      ) : (
        <h2 className="glassmorphism w-fit rounded p-2 text-center text-base">
          Welcome, {heroStr}!
        </h2>
      )}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold lg:text-5xl">{time}</h1>
        <p className="text-md lg:text-lg font-medium text-sky-1">{fmtDate}</p>
      </div>
    </div>
  );
};

export default Clock;
