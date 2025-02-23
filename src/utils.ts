import { Move, Moves, UserMoves } from "./types";

export const loadUserData = async () => {
  const userData: UserMoves = await import(`./users/user1.json`).then((res) =>
    JSON.parse(JSON.stringify(res.default))
  );
  console.log("🚀 ~ loadUserData ~ userData:", userData);

  return userData;
};

export const loadMoves = async () => {
  const moves: Moves = [];

  const modules = import.meta.glob("./moves/steve/*.json", {
    import: "default",
  });

  for (const path in modules) {
    const move = (await modules[path]()) as Move;
    moves.push(move);
  }

  return moves;
};

export const enrichMoves = ({
  moves,
  userData,
}: {
  moves: Moves;
  userData: UserMoves;
}) => {
  return moves.map((move) => {
    // Find the move with the same id as the current user move
    // add users data and return
    const userMoveData = userData.find((m) => m._id === move._id);

    return {
      ...move,
      ...userMoveData,
    };
  });
};
