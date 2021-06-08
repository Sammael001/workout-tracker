
const demoSavedWorkouts = [
  {
    workoutName: "Demo Abs Workout",
    id: "001",
    routine: [
      { name: "hip dips", imgSrc: "hip dips.gif", duration: "20", id: "545726826" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "8704683683658" },
      { name: "crunches", imgSrc: "crunches.gif", duration: "20", id: "8794937386" }
    ]
  },
  {
    workoutName: "Demo Legs Workout",
    id: "002",
    routine: [
      { name: "rainbow (L)", imgSrc: "rainbow left.gif", duration: "20", id: "783742527425" },
      { name: "rainbow (R)", imgSrc: "rainbow right.gif", duration: "20", id: "7112523425" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "76925727" }
    ]
  }
];

const exampleWorkout = {
  workoutName: "Example Routine 1",
  id: "003",
  routine: [
    { name: "crunches", imgSrc: "crunches.gif", duration: "30", id: "777" },
    { name: "rest", imgSrc: "rest.gif", duration: "5", id: "888" },
    { name: "hip dips", imgSrc: "hip dips.gif", duration: "30", id: "999" },
    { name: "rest", imgSrc: "rest.gif", duration: "5", id: "000" },
  ]
};

const defaultWorkout = {
  workoutName: "Abs Workout 1",
  id: "004",
  routine: [
    { name: "plank", imgSrc: "plank.png", duration: "20", id: "8550489383" }, // <-- setting durations to strings bc when we load from localStorage, we'll be dealing with strings
    { name: "rest", imgSrc: "rest.png", duration: "5", id: "93783672727" },
    { name: "leg lifts", imgSrc: "leg-lifts.png", duration: "20", id: "542546457" },
    // { name: "rest", imgSrc: "rest-1.png", duration: "5" },
    // { name: "crunches", imgSrc: "crunch-1.png", duration: "15" },
    // { name: "rest", imgSrc: "rest-1.png", duration: "5" },
    // { name: "windshield wipers", imgSrc: "lunge-1.png", duration: "15" }
  ]
};

const exerciseOptions = [
  "rest",
  // LEGS exercises
  "side plank leg lift (L)",
  "side plank leg lift (R)",
  "lower leg lift (L)",
  "lower leg lift (R)",
  "upper leg circle (L)",
  "upper leg circle (R)",
  "heel press leg lift (L)",
  "heel press leg lift (R)",
  "knee touch extension (L)",
  "knee touch extension (R)",
  "up and over (L)",
  "up and over (R)",
  "triangle leg raise (L)",
  "triangle leg raise (R)",
  "side leg raise (L)",
  "side leg raise (R)",
  "rainbow (L)",
  "rainbow (R)",
  "fire hydrant (L)",
  "fire hydrant (R)",
  "single leg circle (L)",
  "single leg circle (R)",
  "plie",
  "standing gate open (L)",
  "standing gate open (R)",
  "leg sweep (L)",
  "leg sweep (R)",
  "lunge tap",
  // ABS exercises
  "reverse crunch leg extension",
  "reverse crunches",
  "spiderman plank",
  "crossbody mountain climbers",
  "russian twist",
  "in and out",
  "hip dips",
  "plank",
  "hundreds",
  "crunches",
  "up and down plank",
  "spiderman plank",
  "heel taps",
  "windshield wipers",
  "straight leg crunches",
  "up and down plank"
]

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};



export { defaultWorkout, demoSavedWorkouts, confettiConfig, exampleWorkout, exerciseOptions };
