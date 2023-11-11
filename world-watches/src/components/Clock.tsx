import { useState, useEffect, useRef } from "react";

type Props = {
  name: string;
  timezone: number;
  handlerClick: (elementDelete: string) => void;
};

const Clock = ({ name, timezone, handlerClick }: Props): JSX.Element => {
  const [time, setTime] = useState<Date>(new Date());
  const componentDelete = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeWithTimezone = (date: Date, timezone: number): Date => {
    const utcDate = date.getTime() + date.getTimezoneOffset() * 60000;
    const newDate = new Date(utcDate + timezone * 3600000);
    return newDate;
  };

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const getRotationDegrees = (
    time: Date,
    unit: "hours" | "minutes" | "seconds"
  ): number => {
    let value: number;
    if (unit === "hours") {
      value = getTimeWithTimezone(time, timezone).getHours();
    } else if (unit === "minutes") {
      value = getTimeWithTimezone(time, timezone).getMinutes();
    } else {
      value = getTimeWithTimezone(time, timezone).getSeconds();
    }
    const totalUnits = unit === "hours" ? 12 : 60;
    const degreesPerUnit = 360 / totalUnits;
    return value * degreesPerUnit + 90;
  };

  return (
    <>
      <div className="clock">
        <h2 className="name-clock">{name}</h2>
        <div className="clock-face">
          <div
            className="hand hour-hand"
            style={{
              transform: `rotate(${getRotationDegrees(time, "hours")}deg)`,
            }}
          ></div>
          <div
            className="hand minute-hand"
            style={{
              transform: `rotate(${getRotationDegrees(time, "minutes")}deg)`,
            }}
          ></div>
          <div
            className="hand second-hand"
            style={{
              transform: `rotate(${getRotationDegrees(time, "seconds")}deg)`,
            }}
          ></div>
        </div>
        <div
          className="delete"
          onClick={() =>
            handlerClick(JSON.stringify(componentDelete.current?.dataset.name))
          }
          data-name={name}
          ref={componentDelete}
        ></div>
      </div>
      <p className="digital-clock">
        {formatTime(getTimeWithTimezone(time, timezone))}
      </p>
    </>
  );
};

export default Clock;
