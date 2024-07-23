import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  title: string;
  className?: string;
  btnText?: string;
  children?: ReactNode;
  onClose: () => void;
  handleClick?: () => void;
  btnIcon?: string;
  img?: string;
}
const MeetingModal = (props: MeetingModalProps) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 bg-dark-1 px-6 py-9 text-white border-none">
        <div className="flex flex-col gap-6">
          {props.img && (
            <div className="flex justify-center">
              <Image src={props.img} alt="image" width={72} height={72} />
            </div>
          )}
          <h1
            className={cn(`text-3xl font-bold leading-[42px]`, props.className)}
          >
            {props.title}
          </h1>
          {props.children}
          <Button
            className="bg-active-1 hover:bg-active-2 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={props.handleClick}
          >
            {props.btnIcon && (
              <Image src={props.btnIcon} alt="ButtonIcon" width={18} height={18} />
            )}
            &nbsp;
            {props.btnText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
