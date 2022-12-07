export type UserEvents = {
    user_updated: {
        userId: string;
        fields: Record<string, any>;
    };
    update_user_failed: {
        userId: string;
        message: string;
        fields: Record<string, any>;
    };
    user_favourite_toggled: {
        userId: string;
        productId: string;
        value: boolean;
    };
    user_deleted: {
        userId: string;
    };
    delete_user_failed: {
        userId: string;
        message: string;
    };
};
