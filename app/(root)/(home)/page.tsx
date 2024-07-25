import Clock from "@/components/Clock";
import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover bg-no-repeat">
        <Clock />
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
