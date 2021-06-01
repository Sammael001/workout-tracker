import {useState, useEffect} from "react";

// when used to declare pcsOfSt8 + state-setters, this custom hook useLocalStorageState is very similar to basic useState
// like useState, it returns pcOfSt8 and state-setter: --> const [mySt8Val, setMySt8Val] = useLocalStorageState("storageKey", someInitialValue)
// three important differences:
// A) useLocalStorageState expects us to pass in a localStorageKey (to store our data under in localStorage) as well as initialValue
// on the inside, useLocalStorageState does 2 things:
//    B) checks localStorage for key of "localStorageKey", and autofills pcOfSt8 with the value from localStorage (if found)...
//        ...if not found, pcOfSt8 value defaults to the 2nd arg
//    C) this hook also calls useEffect to sync value of localStorage (at key of localStorageKey) anytime this pcOfSt8 is changed

function useLocalStorageState(localStorageKey, defaultVal){
  const [stateVal, setStateVal] = useState(() => { // <- LOOK! Passing a function into useState, rather than a string
    let val;
    try {
      // make a pcOfSt8 based on whatever is in localStorage under localStorageKey...if nothing there, use defaultVal
      val = JSON.parse(window.localStorage.getItem(localStorageKey) || String(defaultVal))
    } catch (err) {
      val = defaultVal;
    }
    return val;
    // "val" is, of course, the initialValue that useState expects
  });

  // use useEffect to update value of localStorage whenever that pcOfSt8 changes
  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(stateVal));
  }, [stateVal, localStorageKey]);
  // ^^^^^^^ LOOK! passing in 2nd param (this array) ensures that useEffect "monitors" stateVal and localStorageKey, and ONLY runs if either of these 2 values have been updated (even if contents are the same)
  // added 2nd element, localStorageKey, to remove console warning "React Hook useEffect has a missing dependency: 'localStorageKey'."
  // https://www.robinwieruch.de/react-hooks-fetch-data
  // ^^ "The second argument can be used to define all the variables (allocated in this array) on which the hook depends."

  // in this app the localStorageKey is a hardcoded value ("todos"), but if it wasn't...
  // ...and we were to declare this inside TodoApp --> const [todos, setTodos] = useLocalStorageState(someKey, initialTodos);
  // ...and later someKey's value changed, useEffect would likely run again

  return [stateVal, setStateVal];
}

export default useLocalStorageState;
