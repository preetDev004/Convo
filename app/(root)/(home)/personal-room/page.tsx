"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PersonalRoom = () => {
  const client = useStreamVideoClient();
  const user = useUser();
  const meetingId = user?.user?.id;
  const { call } = useGetCallById(meetingId!);
  const router = useRouter()
  const title =
    user?.user?.firstName + "'s Meeting Room" || "User's Meeting Room";
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal-room=true`;


  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);
    if (!call) {
      await newCall?.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "Personal Room",
          },
        },
      });
    }
    router.push(`/meeting/${meetingId}?personal-room=true`)
  };
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="relative flex max-w-[900px] rounded-xl sm:rounded-2xl bg-dark-1 p-4 sm:p-6 shadow-xl lg:shadow-2xl">
        <div className="w-full flex flex-col gap-10">
          <p className="text-md lg:text-xl font-semibold">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </p>
          <div className="w-full flex flex-col gap-4">
            <p className="flex justify-between gap-4">
              <span className="font-medium">Room ID </span>{" "}
              <span className="font-light">{meetingId}</span>
            </p>
            <p className="md:flex justify-between gap-4 hidden">
              <span className="font-medium">Invite Link </span>{" "}
              <span className="font-light">{meetingLink}</span>
            </p>
            <p className="flex justify-between gap-4 md:hidden">
              <span className="font-medium">Invite Link </span>{" "}
              <span className="font-light">{meetingLink.length > 30 ? meetingLink.substring(0,30)+"...":meetingLink}</span>
            </p>
          </div>
          <div className="w-full flex flex-row gap-4">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(meetingLink);
                toast({
                  title: "Link Copied!",
                  variant: "success",
                  duration: 2500,
                });
              }}
              className="hover:bg-[#7676764b] bg-[#7676761e] text-sky-1  rounded p-5  w-full"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
            <Button
              onClick={startRoom}
              className="bg-[#007dfc] hover:bg-[#007efcaf] rounded p-5 w-full"
            >
              {" "}
              Start Meeting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalRoom;
