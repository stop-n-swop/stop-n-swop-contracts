import { Notice } from './entities';

export type GetNoticesReQuest = void;
export interface GetNoticesResponse {
  notices: Notice[];
}
