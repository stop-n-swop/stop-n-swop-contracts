import { Address } from "../user";

export interface SaveBankDetailsRequest {
  name: string;
  address: Address;
  sortCode: string;
  accountNumber: string;
}
export type SaveBankDetailsResponse = {};
