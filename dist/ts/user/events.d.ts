import type { Condition, Region } from '../listing';
import type { ErrorMessage, Message, Signal } from '../utils';
import type { Address, User } from './entities';
export type UserSignals = {
    fetch_user: Signal<{
        identity: string;
        authToken?: string;
    }>;
    fetch_user_favourites: Signal<{
        userId: string;
        authToken: string;
    }>;
    search_users: Signal<{
        userIds?: string[];
        authToken?: string;
    }>;
    fetch_rating_scores: Signal<{
        identity?: string;
        listingId?: string;
    }>;
    update_user: Signal<{
        authToken: string;
        userId: string;
        username?: string;
        address?: Partial<Address>;
        preferences?: {
            noticeEmails?: boolean;
            useBalance?: boolean;
            region?: Region;
            condition?: Condition;
            boxed?: boolean;
            instructions?: boolean;
            includeProtection?: boolean;
        };
        level?: number;
        balance?: number;
        rating?: number;
    }>;
    sync_user_rating: Signal<{
        userId: string;
        authToken: string;
    }>;
    send_issue_report: Signal<{
        userId: string;
        authToken: string;
        url: string;
        category: string;
        message: string;
    }>;
    toggle_user_favourite: Signal<{
        userId: string;
        productId: string;
        authToken: string;
        value: boolean;
    }>;
    delete_user: Signal<{
        userId: string;
        authToken: string;
    }>;
};
export type UserMessages = {
    user_fetched: Message<{
        user: User;
    }>;
    fetch_user_failed: ErrorMessage;
    user_favourites_fetched: Message<{
        productIds: string[];
    }>;
    fetch_user_favourites_failed: ErrorMessage;
    users_searched: Message<{
        users: User[];
    }>;
    search_users_failed: ErrorMessage;
    rating_scores_fetched: Message<{
        scores: Array<{
            key: string;
            value: number;
        }>;
    }>;
    fetch_rating_scores_failed: ErrorMessage;
    user_updated: Message<{
        userId: string;
        fields: Record<string, any>;
    }>;
    update_user_failed: ErrorMessage<{
        userId: string;
        fields: Record<string, any>;
    }>;
    user_rating_changed: Message<{
        userId: string;
        rating: number;
    }>;
    user_favourite_toggled: Message<{
        userId: string;
        productId: string;
        value: boolean;
    }>;
    toggle_user_favourite_Failed: ErrorMessage;
    user_deleted: Message<{
        userId: string;
    }>;
    delete_user_failed: ErrorMessage<{
        userId: string;
    }>;
};
