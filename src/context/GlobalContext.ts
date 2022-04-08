import { createContext } from "react";
import { dayjs } from "../utils/dayjs";

export interface EventProps {
  id: string;
  day: number;
  title: string;
  label: string;
  description: string;
}

export interface EventsDispatchProps {
  type: string;
  payload: EventProps;
}

export interface LabelProps {
  label: string;
  checked: boolean;
}

const GlobalContext = createContext({
  monthIndex: dayjs().month(),
  setMonthIndex: (monthIndex: number) => {},
  smallCalendarMonth: dayjs().month(),
  setSmallCalendarMonth: (monthIndex: number) => {},
  daySelected: dayjs(),
  setDaySelected: (day: any) => {},
  showEventModal: false,
  setShowEventModal: (showEvent: boolean) => {},
  dispatchCalEvent: ({ type, payload }: EventsDispatchProps) => {},
  savedEvents: [] as EventProps[],
  selectedEvent: {} as EventProps,
  setSelectedEvent: (event: EventProps) => {},
  setLabels: (labels: LabelProps[]) => {},
  labels: [] as LabelProps[],
  updateLabel: (payload: LabelProps) => {},
  filteredEvents: [] as EventProps[],
});

export default GlobalContext;
