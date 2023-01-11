import type { Signal, Message, ErrorMessage } from '../utils';
import type { Platform, Product } from './entities';
import { ProductType } from './enums';
export type ProductSignals = {
    fetch_platforms: Signal;
    fetch_product: Signal<{
        id: string;
    }>;
    fetch_product_counts: Signal<{
        search: string;
        platforms: string[];
        developerIds: string[];
        publisherIds: string[];
        available: boolean;
        favourites: boolean;
        authToken: string;
        type: ProductType;
    }>;
    fetch_popular_products: Signal;
    search_products: Signal<{
        page: number;
        search: string;
        platforms: string[];
        developerIds: string[];
        type?: ProductType;
        publisherIds: string[];
        ids?: string[];
        gameIds?: string[];
        group?: boolean;
        available?: boolean;
        pageSize?: number;
        favourites?: boolean;
        authToken?: string;
    }>;
    update_market_price: Signal<{
        productId: string;
    }>;
    track_listing_view: Signal<{
        userId: string;
        listingId: string;
        authToken: string;
    }>;
    track_product_view: Signal<{
        productId: string;
        authToken: string;
    }>;
    purge_views: Signal;
};
export type ProductMessages = {
    platforms_fetched: Message<{
        platforms: Platform[];
    }>;
    fetch_platforms_failed: ErrorMessage;
    product_fetched: Message<{
        product: Product;
    }>;
    fetch_product_failed: ErrorMessage<{
        id: string;
    }>;
    product_counts_fetched: Message<{
        total: number;
        platforms: Record<string, number>;
        developers: Record<string, {
            id: string;
            name: string;
            count: number;
        }>;
        publishers: Record<string, {
            id: string;
            name: string;
            count: number;
        }>;
    }>;
    fetch_product_counts_failed: ErrorMessage;
    popular_products_fetched: Message<{
        products: Product[];
    }>;
    fetch_popular_products_failed: ErrorMessage;
    products_searched: Message<{
        nextPage: number;
        lastPage: number;
        products: Product[];
    }>;
    search_products_failed: ErrorMessage;
    market_price_updated: Message<{
        productId: string;
    }>;
    update_market_price_failed: ErrorMessage<{
        productId: string;
    }>;
};
