import { createContext, useContext, useState, useEffect } from "react";
import { EnrichedMoves, UsersMoves, Moves } from "@/lib/types";
import {
  loadMoves,
  loadUsersMoves,
  enrichMovesWithUserDataAndGifs,
  loadGifPaths,
  enrichMovesWithGifs,
} from "@/lib/utils";

const AppContext = createContext<ContextState>({} as ContextState);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [enrichedMoves, setEnrichedMoves] = useState([] as EnrichedMoves); // Moves with user data added
  const [usersMoves, setUsersMoves] = useState([] as UsersMoves);
  const [moves, setMoves] = useState([] as Moves); // Moves with gif src added

  useEffect(() => {
    const loadData = async () => {
      // Load from stores
      const usersMoves = await loadUsersMoves(); // These must be set to variables to prevent the infinate re rendering caused by the setEnrichedMoves function below
      const movesStore = await loadMoves();
      const gifs = await loadGifPaths();

      // Add gifs to moves
      const moves = enrichMovesWithGifs({
        moves: movesStore,
        gifPaths: gifs,
      });

      // Add user data to moves
      const movesWithUserData = enrichMovesWithUserDataAndGifs({ moves, usersMoves });

      // Save everything
      setMoves(moves);
      setUsersMoves(usersMoves);
      setEnrichedMoves(movesWithUserData);
    };

    loadData();
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          usersMoves,
          moves,
          enrichedMoves,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export function useAppContext(): ContextState {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useConfigContext must be rendered in a tree within a ConfigContextProvider");
  }
  return context;
}

export default AppContext;

interface Props {
  children: React.ReactNode;
}

interface ContextState {
  enrichedMoves: EnrichedMoves;
  moves: Moves;
  usersMoves: UsersMoves;
}
