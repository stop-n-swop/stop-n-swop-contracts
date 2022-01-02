import { Type } from './enums';

export interface Notice {
  type: Type;
  created: Date;
  viewed: boolean;
  data?: Record<string, any>;
}
