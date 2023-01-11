import { OauthProvider } from '../user';
import type { Signal, Message, ErrorMessage } from '../utils';
export type AuthSignals = {
    get_magic_link: Signal<{
        path: string;
        email: string;
    }>;
    log_in: Signal<{
        provider: OauthProvider;
        token: string;
        favouriteProductIds: string[];
        userId?: string;
    }>;
    refresh_token: Signal<{
        token: string;
    }>;
    remove_provider: Signal<{
        authToken: string;
        userId: string;
        provider: OauthProvider;
    }>;
    purge_sso: Signal;
};
export type AuthMessages = {
    magic_link_created: Message<{
        id: string;
        userId: string;
        code: string;
        link: string;
    }>;
    magic_link_failed: ErrorMessage;
    logged_in: Message<{
        authToken: string;
        refreshToken: string;
        userId: string;
    }>;
    log_in_failed: ErrorMessage;
    token_refreshed: Message<{
        authToken: string;
        refreshToken: string;
        userId: string;
    }>;
    refresh_token_failed: ErrorMessage;
    provider_removed: Message;
    remove_provider_failed: ErrorMessage<{
        userId: string;
    }>;
};
