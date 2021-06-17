
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
  },
  {
    workoutName: "CT - Abs 1",
    id: "008",
    routine: [
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "8285638n3bg727" },
      { name: "side plank leg lift (L)", imgSrc: "side plank leg lift left.gif", duration: "30", id: "4j83b457bh5" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "zsgsnbr5784b" },
      { name: "lower leg lift (L)", imgSrc: "lower leg lift left.gif", duration: "30", id: "1143657jnvg245bh5" },
      { name: "upper leg circle (L)", imgSrc: "upper leg circle left.gif", duration: "30", id: "6w58n34j83b4w57bh5" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "383e5638n3bg727" },
      { name: "heel press leg lift (L)", imgSrc: "heel press leg lift left.gif", duration: "30", id: "q346b4j83q5qh5" },
      { name: "knee touch extension (L)", imgSrc: "knee touch extension left.gif", duration: "30", id: "4nm45682bv14" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "jnn4763g2562476" },
      { name: "up and over (L)", imgSrc: "up and over left.gif", duration: "30", id: "bny56734623656" },
      { name: "triangle leg raise (L)", imgSrc: "triangle leg raise left.gif", duration: "30", id: "nj58g34526f" },
      { name: "rest", imgSrc: "rest.gif", duration: "10", id: "nmn678bv35626" },

      { name: "side plank leg lift (R)", imgSrc: "side plank leg lift right.gif", duration: "30", id: "q346q6bvq5" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "4679jn35365" },
      { name: "lower leg lift (R)", imgSrc: "lower leg lift right.gif", duration: "30", id: "wey54ke5737" },
      { name: "upper leg circle (R)", imgSrc: "upper leg circle right.gif", duration: "30", id: "6w547kmwwwwnj5" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "q25huyetueie" },
      { name: "heel press leg lift (R)", imgSrc: "heel press leg lift right.gif", duration: "30", id: "wer63457jsw" },
      { name: "knee touch extension (R)", imgSrc: "knee touch extension right.gif", duration: "30", id: "568emnw5ywy4" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "6nwysdhsfsf" },
      { name: "up and over (R)", imgSrc: "up and over right.gif", duration: "30", id: "e6wnsadfhadfh" },
      { name: "triangle leg raise (R)", imgSrc: "triangle leg raise right.gif", duration: "30", id: "ar5ujsfgafta" },
      { name: "rest", imgSrc: "rest.gif", duration: "10", id: "6ejgfjsfhaerer" },

      { name: "side leg raise (L)", imgSrc: "side leg raise left.gif", duration: "30", id: "h5t6746jjwyw" },
      { name: "side leg raise (R)", imgSrc: "side leg raise right.gif", duration: "30", id: "94356ybybb245" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "35673657bn3" },
      { name: "rainbow (L)", imgSrc: "rainbow left.gif", duration: "30", id: "jmdgyteyejes55" },
      { name: "rainbow (R)", imgSrc: "rainbow right.gif", duration: "30", id: "45qhfhrwtuwu" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "7jejhnwr5ywhh" },
      { name: "fire hydrant (L)", imgSrc: "fire hydrant left.gif", duration: "30", id: "hw458ygrh2w" },
      { name: "fire hydrant (R)", imgSrc: "fire hydrant right.gif", duration: "30", id: "34tgqagqerg46556" },
      { name: "rest", imgSrc: "rest.gif", duration: "5", id: "f34gf34fgth6uu" },
      { name: "single leg circle (L)", imgSrc: "single leg circle left.gif", duration: "30", id: "56n678j546hj" },
      { name: "single leg circle (R)", imgSrc: "single leg circle right.gif", duration: "30", id: "wrgr6735735hj" },
      { name: "rest", imgSrc: "rest.gif", duration: "10", id: "hjuikt867846" },

      { name: "plie", imgSrc: "plie.gif", duration: "30", id: "76846kj46373" },
      { name: "standing gate open (L)", imgSrc: "standing gate open left.gif", duration: "30", id: "ghjyui7iigdhd" },
      { name: "standing gate open (R)", imgSrc: "standing gate open right.gif", duration: "30", id: "432gshtyu78jy" },
      { name: "leg sweep (L)", imgSrc: "leg sweep left.gif", duration: "30", id: "679k5435yhh" },
      { name: "leg sweep (R)", imgSrc: "leg sweep right.gif", duration: "30", id: "889879jhnfshs" },
      { name: "lunge taps", imgSrc: "lunge taps.gif", duration: "30", id: "657356uhgfghg" }
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
