import { useState, useEffect } from "react";

import "./App.css";
import { loadMoves, loadUserData, enrichMoves } from "./utils";

function App() {
  const [userData, setUserData] = useState<Data[]>();
  // const [moves, setMoves] = useState<Move[]>();
  const [mergedData, setMergedData] = useState<any[]>();

  type Data = {
    _id: number;
    mastery: number;
    drillReps: number;
  };

  useEffect(() => {
    // const loadData = async () => {
    //   const moves: Move[] = [];

    //   const modules = import.meta.glob("./moves/steve/*.json", {
    //     import: "default",
    //   });

    //   // if (!modules) return;

    //   console.log("🚀 ~ loadData ~ modules:", modules);

    //   for (const path in modules) {
    //     modules[path]().then((mod) => {
    //       const move = mod as Move;
    //       moves.push(move);
    //     });
    //   }
    //   console.log("🚀 ~ modules[path] ~ moves:", moves);

    //   // const moves = await readAllMoves();

    //   setUserData(userData);
    //   // setMoves(moves);

    //   console.log("hsaksjhdksjh");

    //   // moves.map((move) => {
    //   //   console.log("🚀 ~ move:", move);
    //   // });

    //   // const enrichedMoves = moves.map((move) => {
    //   //   // Find the move with the same id as the current user move
    //   //   // add users data and return
    //   //   console.log("🚀 ~ dasdasdsda ~ move:", move);
    //   //   const usersMoves = userData.find((m) => m._id === move._id);
    //   //   return {
    //   //     ...move,
    //   //     ...usersMoves,
    //   //   };
    //   // });

    //   // setMergedData(enrichedMoves);

    //   // console.log("🚀 ~ loadData ~ enriched moves:", enrichedMoves);
    //   // console.log("🚀 ~ loadData ~ userSaved:", userSaved);
    // };

    const loadData = async () => {
      const userData = await loadUserData();
      const moves = await loadMoves();

      console.log("userData", userData);
      console.log("moves", moves);

      console.log(enrichMoves({ moves, userData }));
    };

    loadData();
  }, []);

  return (
    <>
      <h1>User Saved Moves</h1>
      <div>
        {userData?.map((move) => (
          <div key={move._id}>
            <p>ID: {move._id}</p>
            <p>Mastery: {move.mastery}</p>
            <p>Drill Reps: {move.drillReps}</p>
          </div>
        ))}
      </div>

      {/* <h1>All Moves</h1>
      <div>
        {moves?.map((move) => (
          <div key={move._id}>
            <p>ID: {move._id}</p>
            <p>Name: {move.name}</p>
            <p>Family: {move.family}</p>
            <p>Difficulty: {move.difficulty}</p>
            <p>First Encountered: {move.firstEncountered}</p>
          </div>
        ))}
      </div> */}

      <h1>Merged Data</h1>
      <div>
        {mergedData?.map((data) => (
          <div key={data._id}>
            <p>ID: {data._id}</p>
            <p>Mastery: {data.mastery}</p>
            <p>Drill Reps: {data.drillReps}</p>
            <p>Name: {data.name}</p>
            <p>Family: {data.family}</p>
            <p>Difficulty: {data.difficulty}</p>
            <p>First Encountered: {data.firstEncountered}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

interface Test {
  difficulty: number;
  family: string;
  firstEncountered: string;
  name: string;

  _id: number;
  mastery: number;
  drillReps: number;
}
