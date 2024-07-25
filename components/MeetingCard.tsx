import { Call, CallRecording } from "@stream-io/video-react-sdk";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { cn } from "@/lib/utils";
import { toast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: Date;
  icon: string;
  isPreviousMeeting?: boolean;
  btnIcon1?: string;
  btnText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = (props: MeetingCardProps) => {
  const time = props.date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  const fmtDate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    props.date
  );

  return (
    <section className="w-full flex flex-col min-h-[200px] justify-between bg-dark-1 p-4 rounded">
      <div className="flex flex-col gap-2">
        <Image
          className="font-bold"
          src={props.icon}
          alt="image"
          width={20}
          height={20}
        />
        <h2 className="text-xl sm:text-2xl font-semibold">{props.title}</h2>
        <span className="text-sm md:text-md  text-sky-1/90">{time} | {fmtDate} </span>
      </div>

      <div
        className={`${
          props.isPreviousMeeting
            ? "relative bottom-10 flex justify-between right-0"
            : "relative flex justify-between"
        }`}
      >
        <div
          className={`${
            props.isPreviousMeeting
              ? "flex w-full"
              : "flex w-full max-sm:hidden"
          }`}
        >
          {avatarImages.map((avatar, index) => (
            <Image
              key={index}
              className={cn("rounded-full absolute z-20", {
                absolute: index > 0,
              })}
              style={
                props.isPreviousMeeting
                  ? { top: 0, right: index * 28 }
                  : { top: 0, left: index * 28 }
              }
              src={avatar}
              alt={"participant"}
              width={40}
              height={25}
            />
          ))}
          <div
            className={`${
              props.isPreviousMeeting
                ? "hidden"
                : "flex items-center justify-center absolute left-[135px] z-40 size-10 rounded-full border-[5px] border-dark-2 bg-dark-2 text-gray-200"
            }`}
          >
            +5
          </div>
        </div>
        {!props.isPreviousMeeting && (
          <div className="w-full justify-end flex gap-2">
            <Button
              onClick={props.handleClick}
              className="rounded bg-[#007dfc] hover:bg-[#007efcb9] px-6"
            >
              {props.btnIcon1 && (
                <Image
                  src={props.btnIcon1}
                  alt="feature"
                  width={20}
                  height={20}
                />
              )}
              {props.btnIcon1 && <span>&nbsp;</span>}{props.btnText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(props.link);
                toast({
                  title: "Link Copied!",
                  variant: "success",
                  duration: 2500,
                });
              }}
              className="hover:bg-[#7676764b] bg-[#7676761e] px-6 rounded"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MeetingCard;
