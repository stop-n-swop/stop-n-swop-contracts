import type { Status } from "./enums";
export interface Order {
    id: string;
    listingId: string;
    username: string;
    status: Status;
    created: Date;
}
