import type { Condition, Region } from '../listing';
import type { UserLevel, OauthProvider } from './enums';
export interface Address {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
}
export interface User {
    userId: string;
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
        useBalance: boolean;
        region: Region;
        condition: Condition;
        boxed: boolean;
        instructions: boolean;
        includeProtection: boolean;
    };
    verified: boolean;
    logins: OauthProvider[];
    rating: number;
}
