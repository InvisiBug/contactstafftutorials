export type EnrichedMove = Move & UserData;

export type Moves = Move[];

export type Move = {
  difficulty: number;
  family: string;
  firstEncountered: string;
  name: string;
  _id: number;
};

export type UserMoves = UserData[];

type UserData = {
  _id: number;
  mastery?: number;
  drillReps?: number;
  status?: string;
};
