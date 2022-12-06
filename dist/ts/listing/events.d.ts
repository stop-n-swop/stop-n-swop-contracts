import { Status } from '../order';
export type ListingEvents = {
    listing_created: {
        listingId: string;
        userId: string;
    };
    create_listing_failed: {
        userId: string;
        productIds: string[];
        message: string;
    };
    listing_updated: {
        listingId: string;
        userId: string;
        fields: Record<string, any>;
    };
    listing_update_failed: {
        listingId: string;
        fields: Record<string, any>;
        message: string;
    };
    listing_status_changed: {
        listingId: string;
        status: Status;
    };
    listing_status_failed: {
        listingId: string;
        message: string;
    };
    image_uploaded: {
        id: string;
    };
    image_upload_failed: {
        message: string;
    };
    image_amended: {
        lastId: string;
        newId: string;
    };
    amend_image_failed: {
        id: string;
        message: string;
    };
    listing_image_approved: {
        listingId: string;
        imageKey: string;
        userId: string;
    };
    listing_image_rejected: {
        listingId: string;
        imageKey: string;
        userId: string;
        reason: string;
    };
    listing_deleted: {
        listingId: string;
    };
    listing_delete_failed: {
        listingId: string;
        message: string;
    };
};
