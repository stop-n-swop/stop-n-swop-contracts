export type GetListingRequirementsRequest = void;

export interface GetListingRequirementsResponse {
  photos: Array<{
    key: string;
    required: boolean;
  }>;
}
