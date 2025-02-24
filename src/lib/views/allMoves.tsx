import { useEffect, useState, FC, Suspense } from "react";
import { EnrichedMove } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/lib/ui/card";
import { useAppContext } from "@/lib/contexts/appProvider";

export const App: FC = () => {
  const { enrichedMoves } = useAppContext();
  console.log("🚀 ~ usersEnrichedMoves:", enrichedMoves);

  return (
    <>
      <div className={"w-screen min-h-screen bg-gray-500 flex align-middle border-amber-400 border-2"}>
        <div className="w-auto border-2 border-red-400 m-auto p-4 flex flex-row justify-center items-start gap-10 flex-wrap overflow-hidden">
          {enrichedMoves.map((move: EnrichedMove) => {
            const { name, mastery, drillReps, status, family, difficulty, firstEncountered, gifSrc } = move;

            return (
              <Card className={"shadow-gray-600 h-2/10 max-w-70 bg-grey-400 shadow-md"} key={name}>
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <CardContent>
                    <ul>
                      <li>Family: {family}</li>
                      <li>Difficulty: {difficulty}</li>
                      <li>Difficulty: {difficulty}</li>
                      <li>Encountered: {firstEncountered}</li>
                      {status && (
                        <div className={"border-1 border-red-400 pl-2"}>
                          <p className={"text-blue-700"}>User training data</p>
                          <li>Status: {status}</li>
                          <li>Mastery: {mastery}</li>
                          <li>Reps: {drillReps}</li>
                        </div>
                      )}
                      <img src={gifSrc} className={"w-100  rounded-2xl mt-2"} />
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
};

export default App;
