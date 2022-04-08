import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import GlobalContext from "../context/GlobalContext"
import { getMonth } from '../utils/dayjs'
import CalendarHeader from './CalendarHeader'
import EventModal from "./EventModal"
import Month from './Month'
import Sidebar from './Sidebar'

const Calendar: NextPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  )
}

export default Calendar;
