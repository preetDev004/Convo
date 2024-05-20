import Image from "next/image";

interface HomeCardProps {
  title: string;
  desc: string;
  bgColor: string;
  icon: string;
  handleClick: () => void;
}
const HomeCard = (props: HomeCardProps) => {
  return (
    <div
      className={`${props.bgColor} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[400px] min-h-[260px] rounded-[14px] cursor-pointer`}
      onClick={props.handleClick}
    >
      <div className="flex justify-center items-center glassmorphism size-12 rounded-[10px]">
        <Image src={props.icon} alt={props.title} width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <p className="text-lg font-normal">{props.desc}</p>
      </div>
    </div>
  );
};

export default HomeCard;
