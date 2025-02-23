import { Move, Moves, UserMoves, EnrichedMove } from "./types";

export const loadUserData = async () => {
  const userData: UserMoves = await import(`./users/user1.json`).then((res) =>
    JSON.parse(JSON.stringify(res.default))
  );
  console.log("🚀 ~ loadUserData ~ userData:", userData);

  return userData;
};

export const loadMoves = async () => {
  const moves: Moves = [];

  const modules = import.meta.glob("./moves/**", {
    import: "default",
  });

  console.log("🚀 ~ loadMoves ~ modules:", modules);

  for (const path in modules) {
    const move = (await modules[path]()) as Move;
    moves.push(move);
  }

  return moves;
};

export const loadGifs = async () => {
  const gifs: any = [];

  const modules = import.meta.glob("./gifs/**", {
    import: "default",
  });

  // console.log("🚀 ~ loadMoves ~ modules:", modules);

  for (const path in modules) {
    const move = await modules[path]();
    gifs.push(move);
  }

  return gifs;
};

export const myToLowerCase = (string: string) => {
  string = string.replace(/\s+/g, "");
  return string.toLowerCase();
};

export const camelName = (text: string) => {
  text = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return text.substring(0, 1).toLowerCase() + text.substring(1);
};

// export const loadMovesV2 = async (directory: string) => {
//   const moves: Moves = [];
//   const modules = import.meta.glob(directory, {
//     import: "default",
//   });

//   console.log("🚀 ~ loadMoves ~ modules:", modules);

//   for (const path in modules) {
//     const move = (await modules[path]()) as Move;
//     moves.push(move);
//   }

//   return moves;
// };

export const enrichMoves = ({
  moves,
  userData,
}: {
  moves: Moves;
  userData: UserMoves;
}): EnrichedMove[] => {
  const enrichedMoves = moves.map((move) => {
    // Find the move with the same id as the current user move
    // add users data and return
    const userMoveData = userData.find((m) => m._id === move._id);

    return {
      ...move,
      ...userMoveData,
    };
  });

  return enrichedMoves;
};
