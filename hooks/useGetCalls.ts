import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const client = useStreamVideoClient();
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.user?.id) return;
      else {
        setIsLoading(true);
        try {
          const { calls } = await client.queryCalls({
            sort: [{ field: "starts_at", direction: -1 }],
            filter_conditions: {
              starts_at: { $exists: true },
              $or: [
                {
                  created_by_user_id: user?.user?.id,
                },
                {
                  members: { $in: [user?.user?.id] },
                },
              ],
            },
          });
          setCalls(calls);
        } catch (error) {
          console.log("[FETCHING_CALL_ERROR]: ", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadCalls();
  }, [client, user?.user?.id]);

  const now = new Date();
  const dateWeekAgo = new Date().setDate(now.getDate() - 7);
  const callRecordings = calls;

  //   filter calls by endedCalls
  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (
      ((startsAt && new Date(startsAt) < now) || !!endedAt) &&
      startsAt &&
      dateWeekAgo <= new Date(startsAt).getTime()
    );
  });
  //   filter calls by upcomingCalls
  const upcomingCalls = calls.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      return startsAt && new Date(startsAt) > now;
    }
  ).reverse();

  return { endedCalls, upcomingCalls, callRecordings, isLoading };
};
