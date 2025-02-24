export type GifPath = string;

// Moves with gif
export type Moves = Move[];

export type Move = RawMove & {
  gifSrc?: GifPath;
};

// Raw moves from the moves store
export type RawMoves = RawMove[];

export type RawMove = {
  difficulty: number;
  family: string;
  firstEncountered: string;
  name: string;
  _id: number;
};

export type UsersMoves = UserData[];

type UserData = {
  _id: number;
  mastery?: number;
  drillReps?: number;
  status?: string;
};

export type EnrichedMoves = EnrichedMove[];

export type EnrichedMove = Move & UserData;
