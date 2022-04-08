import { Fragment } from "react";
import Day from "./Day";

interface Props {
  month: any;
}

export default function Month({ month }: Props) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {
        month.map((row: number[], month_index: number) => (
          <Fragment key={month_index}>
            {row.map((day: any, row_index: number) => (
              <Day key={`key-day-${row_index}`} day={day} monthIndex={month_index} />
            )
            )}
          </Fragment>
        ))
      }
    </div>
  )
}