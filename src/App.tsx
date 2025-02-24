import { useEffect, useState } from "react";

import {
  loadMoves,
  loadUserData,
  enrichMoves,
  loadGifs,
  myToLowerCase,
  camelName,
} from "./lib/utils";
import { EnrichedMove } from "./lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "./lib/ui/card";

function App() {
  const [userEnrichedMoves, setUserEnrichedMoves] = useState(
    [] as EnrichedMove[]
  );

  const [gifs, setGifs] = useState([] as string[]);

  useEffect(() => {
    const loadData = async () => {
      const userData = await loadUserData();
      const moves = await loadMoves();

      const gifs: string[] = await loadGifs();

      console.log(gifs[0].toLowerCase());

      const name = "Half Steve";
      console.log(camelName(name));

      console.log(gifs.find((gif) => gif.includes(myToLowerCase(name))));

      console.log("userData", userData);
      console.log("moves", moves);

      setGifs(gifs);

      console.log(setUserEnrichedMoves(enrichMoves({ moves, userData })));
    };

    loadData();
  }, []);

  return (
    <>
      <div
        className={
          "w-screen h-screen bg-gray-500 flex align-middle border-amber-400 border-2"
        }
      >
        <div className="w-auto border-2 border-red-400 m-auto p-4 flex flex-row justify-center items-center gap-10 ">
          {userEnrichedMoves.map((move) => {
            const {
              name,
              mastery,
              drillReps,
              status,
              family,
              difficulty,
              firstEncountered,
            } = move;

            return (
              <Card className={"shadow-gray-600  bg-grey-400 shadow-md"}>
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <CardContent>
                    <ul>
                      <li>Family: {family}</li>
                      <li>Difficulty: {difficulty}</li>
                      <li>Difficulty: {difficulty}</li>
                      <li>Encountered: {firstEncountered}</li>
                      <li>-------</li>
                      <p className={"text-blue-500"}>User training data</p>
                      <li>Status: {status}</li>
                      <li>Mastery: {mastery}</li>
                      <li>Reps: {drillReps}</li>
                      <img
                        src={gifs.find((gif) => gif.includes(camelName(name)))}
                        className={"w-50 h-30 rounded-2xl"}
                      ></img>
                    </ul>
                  </CardContent>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
