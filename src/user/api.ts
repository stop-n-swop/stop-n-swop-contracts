import type { OauthProvider } from "./enums";
import type { User } from "./entities";

export interface RefreshTokenRequest {
  token: string;
}
export interface RefreshTokenResponse {
  authToken: string;
  refreshToken: string;
  userId: string;
}

export interface LoginRequest {
  provider: OauthProvider;
  token: string;
  favouriteProductIds: string[];
}
export type LoginResponse = RefreshTokenResponse;

export interface UpdateUserRequest
  extends Pick<Partial<User>, "username" | "level" | "balance"> {
  address?: Partial<User["address"]>;
  clientEmail?: string;
  preferences?: Pick<Partial<User["preferences"]>, "noticeEmails">;
}

export type UpdateUserResponse = void;

export interface FetchFavouritesResponse {
  favourites: string[];
}

export type RemoveProviderRequest = {
  provider: OauthProvider;
};
export type RemoveProviderResponse = void;
