import moment from "moment";
import React, { useEffect, useState } from "react";

export const Clock = ({ timezone }: { timezone: number }) => {
  const [localTime, setLocalTime] = useState<string>();

  const updateLocalTime = () => {
    const localMoment: moment.Moment = moment().utcOffset(timezone / 60);
    const formattedTime: string = localMoment.format("h:mm:ss A");

    setLocalTime(formattedTime);
  };

  useEffect(() => {
    updateLocalTime();

    const interval = setInterval(updateLocalTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return <p className="text-sm">{localTime ? localTime : "Loading"}</p>;
};
