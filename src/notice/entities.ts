import { NoticeType } from './enums';

export interface Notice {
  type: NoticeType;
  created: Date;
  viewed: boolean;
  data?: Record<string, any>;
}
