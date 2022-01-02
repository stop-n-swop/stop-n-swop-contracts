import { KycStatus } from "./enums";

export interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
}

export interface User {
  email: string;
  username: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  nationality: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
  };
  preferences: Record<string, unknown>;
  verified: boolean;
  isRegistered: boolean;
  hasAccount: boolean;
  kycStatus: KycStatus;
}
