
// dayjs().daysInMonth() -->  outputs # of days in current month, ex: 30
// dayjs().format('ddd MMM DD YYYY') --> outputs string of CURRENT date as shown: Wed Jun 09 2021
// dayjs(arg).day() --> outputs day of wk for given date...if arg is blank, outputs today's date
// dayjs(arg).month() --> outputs month for given date...if arg is blank, outputs current month
// dayjs(arg).year() --> outputs year for given date...if arg is blank, outputs current year
// let stringDayOfWk = dayjs(firstDay).format('ddd'); --> OUTPUT: "Tue"



// workoutHistory should look like this:
// workoutHistory: {
//   May2021: [ "", "", "", ....32 elements in array b/c May2021 has 31 days... ],
//   Jun2021: [ "", "", "", "Abs Workout", "", "", "", "", "", "", "", "", "Legs Workout", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ]
//  31 elements in Jun2021 array, b/c Jun2021 has 30 days
// "Abs Workout" is at idx 4 b/c workout was completed Jun-04-2021 ... "Legs Workout" at idx 13 b/c it was completed Jun-13-2021
// }


//            OLD CODE, NOT USED
// fillCalendar takes in the calendarArray from generateCalendar and fills with workouts
// use dayjs().month().format('MMM') to get currentMonth (ex: "Jun") and dayjs().year('YYYY') to get currentYear (ex: "2021")
// concatenate currentMonth + currentYear to get the storageKey (ex: "Jun2021")
// in the workoutHistory obj, access the array at storageKey to find array of all workouts completed in this month and year
// within this array, for each history obj, get histObj.workoutDay
// insert histObj.workoutName into the calendarArray, inside obj whose key matches histObj.workoutDay

// there should be a way to figure out which calArr[row][col] index holds the correct day, based on the position of the first day in the month!

// FOR JUNE: {1: ""} is at calArr[0][2] and if we want to insert a value into this obj 14 days ahead {15: ""}, it's at [2][2]
// a day that's 18 days ahead of dayOne ({19: ""}) will be at [dayOneRow+2][dayOneCol+4]   -- for Jun2021, that's [2][6]

// FOR MAY: {1: ""} is at calArr[0][6] and if we want to insert a value into the obj 14 days ahead {15: ""}, it's at [2][6]
// assuming dayOne ({1: ""}) is at [dayOneRow][dayOneCol], a day that's 7 days ahead of dayOne will be at [dayOneRow+1][dayOneCol]
// a day that's 14 days ahead of dayOne will be at [dayOneRow+2][dayOneCol]
// a day that's 18 days ahead of dayOne ({19: ""}) will be at [dayOneRow+2][dayOneCol+4]
// we of course have to deal with adding too many days to the dayOneCol

// loop through calArr to find obj with key "1", store its row and col indexes as dayOneRow and dayOneCol (ex: 0, 2)
// get the workoutDay we're looking for (ex: 9), subtract one, store this as daysAhead (8)
// divide daysAhead by 7, remove decimal places; this is rowIncrement (1), the number to add to dayOneRow
// daysAhead % 7 to get colIncrement (2), the number to add to dayOneCol
// dayOneRow will always start at 0, but dayOneCol can be 0-6, so we need to deal with a dayOneCol value too large
// if dayOneCol > 6, let excessDays = dayOneCol + colIncrement % 7 ...
// ...then increment dayOneRow by 1, and set dayOneCol = excessDays (could be 0, which is fine)


// [ {X: ""}, {X: ""}, {1: ""}, {2: ""}, {3: ""}, {4: ""}, {5: ""} ]
// [ {6: ""}, {7: ""}, {8: ""}, {9: ""}, {10: ""}, {11: ""}, {12: ""} ]
// [ {13: ""}, {14: ""}, {15: ""}, {16: ""}, {17: ""}, {18: ""}, {19: ""} ]
// [ {20: ""}, {21: ""}, {22: ""}, {23: ""}, {24: ""}, {25: ""}, {26: ""} ]
// [ {27: ""}, {28: ""}, {29: ""}, {30: ""}, {X: ""},  {X: ""},  {X: ""}]

// {1: ""} is at [0][2], {21: ""} is at [3][1]
// dayOneRow = 0, dayOneCol = 2
// daysAhead = 20
// 20/7 = 2, rowIncrement
// 20%7 = 6, colIncrement
// dayOneRow + rowIncrement = 0+2 = 2
// dayOneCol + colIncrement = 2+6 = 8
// since new col value is more than six, get excessDays = 8%7 = 1
// increment dayOneRow by 1 (2+1=3) and set dayOneCol to be excessDays (1)
