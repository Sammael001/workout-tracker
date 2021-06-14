

import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import styles from "../styles/History.module.css";

export default function History({ workoutHistory }) {
  const [ monYrList, setMonYrList ] = useState([]);
  const [ haveLoaded, setHaveLoaded ] = useState(false);
  // import workoutHistory from localStorage, if available
  // if not, display error message
  // filter/parse dates with dayJS

  // console.log( dayjs("May2021").isBefore(dayjs("Jun2021")) );
  useEffect(() => {
    function getMonths(){
      let monthsArray = [];
      for (let monthYearKey in workoutHistory) {
        let empty = workoutHistory[monthYearKey].every(elem => elem === ""); // make sure array at this key in workoutHistory isn't empty
        if (!empty) monthsArray.push(monthYearKey);  // generate array from all month/year keys in workoutHistory
      };
      monthsArray.sort((mon1, mon2) => { // if compareFunction(a, b) returns a value > than 0, sort b before a
        if ( dayjs(mon1).isBefore(dayjs(mon2)) ) { // sort the array we created (since it may be out of order)
          return -1;
        } else {
          return 1;
        }
      });
      setMonYrList(monthsArray);
      setHaveLoaded(true); // necessary to get this useEffect call to run twice...on first run, monYrList is empty
    };
    getMonths();
    // console.log(monYrList);
  }, [workoutHistory, haveLoaded]);

  function mapHistory() {
    let histMap = monYrList.map(monYr => { // map over the sorted keys in monYrList
      let monthMap = workoutHistory[monYr].map((elem, idx) => { // then for each key, map over values in workoutHistory at that key
        if (elem.length > 0) { // if the element in this array is not empty...
          let date = `${monYr.slice(0, 3)}-${idx}-${monYr.slice(3)}`; // set a date string + return a div with workout name(s) and date string
          return (<div className={styles.dateEntry} key={date}>
                    <span className={styles.greenBold}>{date}{' '}~</span><span>{' '}{elem}</span>
                  </div>)
        };
      });
      // return all mapped workouts for the month+year, below a title like 'Jun 2021'
      return (<div className={styles.monthYear} key={monYr}>
                <h3 className={styles.monthYearTitle}>{monYr.slice(0, 3)} {monYr.slice(3)}</h3>
                {monthMap}
                <br/>
                <hr/>
              </div>);
    });
    return histMap; // return all mapped workouts for all months/years
  }

  return (
    <>
      <div>
        { mapHistory() }
      </div>

    </>
  );
};
