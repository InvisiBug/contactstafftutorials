import { Move, Moves, UsersMoves, EnrichedMoves, RawMoves } from "./types";

export const loadUsersMoves = async () => {
  const usersMoves: UsersMoves = await import(`./users/user1.json`).then((res) =>
    JSON.parse(JSON.stringify(res.default))
  );

  return usersMoves;
};

export const loadMoves = async () => {
  const moves: RawMoves = [];

  const modules = import.meta.glob("./moves/**", {
    import: "default",
  });

  for (const path in modules) {
    const move = (await modules[path]()) as Move;
    moves.push(move);
  }

  return moves;
};

export const loadGifPaths = async () => {
  const gifs: string[] = [];

  const modules = import.meta.glob("./gifs/**", {
    import: "default",
  });

  // console.log("🚀 ~ loadMoves ~ modules:", modules);

  for (const path in modules) {
    const move = (await modules[path]()) as string;
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

export const enrichMovesWithUserDataAndGifs = ({
  moves,
  usersMoves,
}: {
  moves: Moves;
  usersMoves: UsersMoves;
}): EnrichedMoves => {
  const enrichedMoves = moves.map((move) => {
    // Find the move with the same id as the current user move
    // add users data and return
    const userMoveData = usersMoves.find((m) => m._id === move._id);

    return {
      ...move,
      ...userMoveData,
    };
  });

  return enrichedMoves;
};

export const enrichMovesWithGifs = ({ moves, gifPaths }: { moves: Moves; gifPaths: string[] }): EnrichedMoves => {
  const enrichedMoves = moves.map((move) => {
    // Find the move with the same id as the current user move
    // add users data and return
    const gifSrc = gifPaths.find((gif) => gif.includes(camelName(move.name)));

    return {
      ...move,
      gifSrc,
    };
  });

  return enrichedMoves;
};
