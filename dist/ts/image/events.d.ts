import { ErrorMessage, Message, Signal } from '../utils';
export type ImageSignals = {
    upload_image: Signal;
    purge_images: Signal;
    delete_image: Signal<{
        authToken: string;
        id: string;
    }>;
};
export type ImageMessages = {
    image_uploaded: Message<{
        id: string;
        uploadUrl: string;
    }>;
    upload_image_failed: ErrorMessage;
    image_verified: Message<{
        listingId: string;
        index: number;
    }>;
    image_deleted: Message<{
        id: string;
    }>;
    delete_image_failed: ErrorMessage<{
        id: string;
    }>;
};
