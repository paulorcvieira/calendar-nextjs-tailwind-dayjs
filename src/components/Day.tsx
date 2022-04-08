import React, { useContext, useEffect, useState } from "react";
import GlobalContext, { EventProps } from "../context/GlobalContext";
import { dayjs } from '../utils/dayjs';

interface Props {
  day: any;
  monthIndex: number;
}

export default function Day({ day, monthIndex }: Props) {
  const [dayEvents, setDayEvents] = useState<EventProps[]>([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt: EventProps) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    setDayEvents([...events]);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-stone-900 text-white rounded-full w-6"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col text-center border-b">
        {monthIndex === 0 && (
          <p className="text-sm mt-1">
            {day.locale('pt-br').format('ddd').toUpperCase()}
          </p>
        )}
        
      </header>

      <div>
        <p className={`text-sm p-1 my-1 text-right ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </div>
      
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((event: EventProps, idx: number) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(event)}
            className={
              `bg-${event.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`
            }
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  )
}