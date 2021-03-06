import { useContext } from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import GlobalContext from "../context/GlobalContext";
import { dayjs } from "../utils/dayjs";


export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(dayjs().month());
  }

  return (
    <header className="px-4 py-2 flex items-center">
      <img src="/assets/logo.png" alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">
        Calendar
      </h1>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <MdChevronLeft />
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <MdChevronRight />
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
      {dayjs(new Date(dayjs().year(), monthIndex)).locale('pt-br').format(
          "MMMM/YYYY"
        )}
      </h2>
    </header>
  )
}