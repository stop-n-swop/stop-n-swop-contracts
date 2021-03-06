import { UserLevel, OauthProvider } from './enums';

export interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
}

export interface User {
  email: string;
  merchantId: string;
  username: string;
  level: UserLevel;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
    location: string;
  };
  created: Date;
  preferences: {
    manualApproval: boolean;
    noticeEmails: boolean;
  };
  verified: boolean;
  logins: OauthProvider[];
}
