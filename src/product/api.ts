import { Game } from "./entities";

export interface SearchGamesRequest {
  page?: number;
  q?: string;
  platformIds?: string[];
  available?: boolean;
  group?: boolean;
  favourites?: boolean;
  developerIds?: string[];
  publisherIds?: string[];
}
export interface SearchGamesResponse {
  nextPage: number;
  lastPage: number;
  games: Game[];
}

export type GetPopularGamesRequest = {};
export type GetPopularGamesResponse = {
  games: Game[];
};

export type GetGameParams = { gameId: string };
export type GetGameRequest = void;
export type GetGameResponse = Game;

export type GetSearchCountsRequest = Omit<SearchGamesRequest, "page" | "group">;
export interface GetSearchCountsResponse {
  total: number;
  platforms: Record<string, number>;
  developers: Record<string, { id: string; name: string; count: number }>;
  publishers: Record<string, { id: string; name: string; count: number }>;
}

export type GameViwedParams = { productId: string };
export type GameViewedRequest = void;
export type GameViewedResponse = {};
