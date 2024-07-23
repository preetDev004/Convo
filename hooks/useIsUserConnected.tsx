import { useUser } from "@clerk/nextjs"
import { useCallStateHooks } from "@stream-io/video-react-sdk"
import { useEffect } from "react"

export const useIsUserConnected = () =>{
    const { useParticipants, useRemoteParticipants } = useCallStateHooks()
    const participants = useRemoteParticipants()
    const user = useUser()

    useEffect(() => {
        console.log(user, participants)
      
    }, [participants, user])

    return false;
    
}