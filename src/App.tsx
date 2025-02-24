import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
    </>
  );
}

export default App;
