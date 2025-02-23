const user1 = [
  {
    _id: 1,
    mastery: 1,
    drillReps: 1,
    status: "learned",
  },
  {
    _id: 2,
    mastery: 10,
    drillReps: 10,
    status: "learning",
  },
];

const moves = [
  {
    _id: 2,
    family: "Steve",
    name: "Steve",
    difficulty: 3,
    firstEncountered: "play 2022",
  },
  {
    _id: 1,
    family: "Steve",
    name: "Caged",
    difficulty: 2,
    firstEncountered: "play 2022",
  },
];

const mergedData = moves.map((userMove) => {
  const usersMoves = user1.find((m) => m._id === userMove._id);
  return {
    ...userMove,
    ...usersMoves,
  };
});

console.log(mergedData);
