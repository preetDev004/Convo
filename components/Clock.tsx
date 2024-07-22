"use client"
import React, { useEffect, useState } from 'react'

const Clock = () => {
    const [date, setDate] = useState(new Date())
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 30000);

        return () => clearInterval(interval);
    }, [])
  
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const fmtDate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
      date
    );

  return (
    <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-5xl">{time}</h1>
            <p className="text-md lg:text-lg font-medium text-sky-1">{fmtDate}</p>
          </div>
  )
}

export default Clock