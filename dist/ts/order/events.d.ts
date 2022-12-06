import { Status } from '.';
export type OrderEvents = {
    order_created: {
        orderId: string;
        listingId: string;
        userId: string;
    };
    order_create_failed: {
        listingId: string;
        userId: string;
    };
    order_updated: {
        orderId: string;
        listingId: string;
        userId: string;
        fields: Record<string, any>;
    };
    order_update_failed: {
        orderId: string;
        fields: Record<string, any>;
        message: string;
    };
    order_status_changed: {
        orderId: string;
        listingId: string;
        userId: string;
        status: Status;
    };
    order_status_failed: {
        orderId: string;
        status: Status;
        message: string;
    };
    order_expiring_soon: {
        orderId: string;
        listingId: string;
    };
    order_deleted: {
        orderId: string;
    };
};
