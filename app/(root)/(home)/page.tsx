import Clock from "@/components/Clock";
import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover bg-no-repeat">
        <div className="flex flex-col justify-between h-full px-5 py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <Clock/>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
