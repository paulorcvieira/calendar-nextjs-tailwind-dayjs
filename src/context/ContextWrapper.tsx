import {
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";
import { dayjs } from "../utils/dayjs";
import GlobalContext, {
  EventProps,
  EventsDispatchProps,
  LabelProps
} from "./GlobalContext";

interface Props {
  children: ReactNode;
}

function savedEventsReducer(
    state: EventProps[],
    { type, payload }: EventsDispatchProps
  ) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((event: EventProps) =>
        event.id === payload.id ? payload : event
      );
    case "delete":
      return state.filter((event: EventProps) => event.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper({ children }: Props) {
  const [monthIndex, setMonthIndex] = useState(0);
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(0);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventProps>(
    {} as EventProps
  );
  const [labels, setLabels] = useState<LabelProps[]>([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((event: EventProps) =>
      labels
        .filter((lbl: LabelProps) => lbl.checked)
        .map((lbl: LabelProps) => lbl.label)
        .includes(event.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels: any) => {
      const newLabels = new Set(savedEvents.map((event) => event.label));

      const labelsFiltered = [...newLabels].map((label) => {
        const currentLabel = prevLabels.find((lbl: any) => lbl.label === label);
        console.log('currentLabel: ', currentLabel);

        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });

      return labelsFiltered


    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent({} as EventProps);
    }
  }, [showEventModal]);

  function updateLabel(label: LabelProps) {
    const newLabels = labels
      .map((labelOld: LabelProps) => (
        labelOld.label === label.label ? label : labelOld)
      );

    setLabels([...newLabels]);
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
