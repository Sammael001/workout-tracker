
import styles from "../styles/CurrentMonth.module.css";
import { useState } from "react";
import dayjs from 'dayjs'; // https://day.js.org/docs/en/display/format

// dayjs().daysInMonth()  -->  outputs # of days in current month, ex: 30
// this VV outputs string of CURRENT date as shown: Wed Jun 09 2021
// dayjs().format('ddd MMM DD YYYY')

// dayjs(arg).day()  <-- outputs day of wk for given date...if arg is blank, outputs today's date
// dayjs(arg).month()  <-- outputs month for given date...if arg is blank, outputs current month
// dayjs(arg).year()  <-- outputs year for given date...if arg is blank, outputs current year

// import workoutHistory from localStorage, if available
// if not, display error message
// filter/parse dates with dayJS

export default function CurrentMonth(props) {
  // const [ dayArray, setDayArray ] = useState(defaultDayArray);
  //
  // let defaultDayArray = [
  //   [ "X", "X", "foo", "X", "X", "X", "X" ], "foo" is at arr[0][2]
  //   [ "X", "X", "X", "X", "X", "X", "X" ],
  //   [ "X", "X", "X", "X", "X", "X", "X" ],
  //   [ "X", "X", "X", "X", "X", "bar", "X" ], "bar" is at arr[3][5]
  //   [ "X", "X", "X", "X", "X", "X", "X" ]
  // ];



  function renderCalendar(){
    const numDays = dayjs().daysInMonth();// determine # of days in month
    // determine what dayOfWk the 1st day in month is
    const firstDay =  `${dayjs().month() + 1}-01-${dayjs().year()}`; // OUTPUT: 6-01-2021
    let dateString = dayjs(firstDay).format('ddd MMM DD YYYY'); // OUTPUT: Tue Jun 01 2021
    let dayOfWk = dayjs(firstDay).day(); // OUTPUT: 2 (Sun = 0, Mon = 1, Tue = 2)
    let stringDayOfWk = dayjs(firstDay).format('ddd'); // OUTPUT: "Tue"

    // to render a calendar, we can have a 3-d array like defaultDayArray above
    // we start at array[row][col], where row is 0 and col initializes as dayOfWk *
    // * this is bcuz, if 1st day of the month is Tuesday, dayOfWk will be "2"
    // at array[row][col] we render dayNum (which inits at 1)
    // then we increment dayNum and col, so at array[row][col+1] we render "2", and so on
    // if col >= 7, we know we've passed the last day of the wk, so we jump to the next row and reset col to 0
    // row should never exceed 4...but we should also check if the dayNum we're incrementing is more than numDays
  }

  function renderDayNames(){
    const dayNames = [ "Sun", "Mon", "Tue", "Wed", "Ths", "Fri", "Sat" ];
    let dayMap = dayNames.map(dayName => (
      <div key={dayName} className={styles.dayOfWk}>{dayName}</div>
    ));
    return dayMap;
  }


  return (
    <div className={styles.mainCard}>
      <h1 onClick={() => renderCalendar()}>{dayjs().format('MMMM')}</h1>
      <div className={styles.dayNamesRow}>
        {renderDayNames()}
      </div>
    </div>
  );
};
