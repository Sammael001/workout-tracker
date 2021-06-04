
const demoSavedWorkouts = [
  {
    workoutName: "Demo Abs Workout",
    id: "001",
    routine: [
      { name: "plank", imgSrc: "plank-1.png", duration: "20", id: "545726826" },
      { name: "rest", imgSrc: "rest-1.png", duration: "5", id: "8704683683658" },
      { name: "crunches", imgSrc: "crunch-1.png", duration: "20", id: "8794937386" }
    ]
  },
  {
    workoutName: "Demo Legs Workout",
    id: "002",
    routine: [
      { name: "leg lifts", imgSrc: "leg-lift-1.png", duration: "20", id: "783742527425" },
      { name: "rest", imgSrc: "rest-1.png", duration: "5", id: "76925727" },
      { name: "lunges", imgSrc: "lunge-1.png", duration: "20", id: "989677368368" }
    ]
  }
];

const exampleWorkout = {
  workoutName: "Example Routine 1",
  id: "003",
  routine: [
    { name: "lunges", imgSrc: "my-img-src.png", duration: "30", id: "777" },
    { name: "rest", imgSrc: "my-img-src.png", duration: "5", id: "888" },
    { name: "crunches", imgSrc: "my-img-src.png", duration: "30", id: "999" },
    { name: "rest", imgSrc: "my-img-src.png", duration: "5", id: "000" },
  ]
};

const defaultWorkout = {
  workoutName: "Abs Workout 1",
  id: "004",
  routine: [
    { name: "plank", imgSrc: "plank-1.png", duration: "20", id: "8550489383" }, // <-- setting durations to strings bc when we load from localStorage, we'll be dealing with strings
    { name: "rest", imgSrc: "rest-1.png", duration: "5", id: "93783672727" },
    { name: "leg lifts", imgSrc: "leg-lift-1.png", duration: "20", id: "542546457" },
    // { name: "rest", imgSrc: "rest-1.png", duration: "5" },
    // { name: "crunches", imgSrc: "crunch-1.png", duration: "15" },
    // { name: "rest", imgSrc: "rest-1.png", duration: "5" },
    // { name: "windshield wipers", imgSrc: "lunge-1.png", duration: "15" }
  ]
};

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



export { defaultWorkout, demoSavedWorkouts, confettiConfig, exampleWorkout };
