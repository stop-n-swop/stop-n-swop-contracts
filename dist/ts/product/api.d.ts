import { Product } from './entities';
import { ProductType } from './enums';
export interface SearchProductsRequest {
    type?: ProductType;
    page?: number;
    q?: string;
    platformIds?: string[];
    available?: boolean;
    group?: boolean;
    favourites?: boolean;
    developerIds?: string[];
    publisherIds?: string[];
}
export interface SearchProductsResponse {
    nextPage: number;
    lastPage: number;
    products: Product[];
}
export type GetPopularProductsRequest = Record<string, never>;
export type GetPopularProductsResponse = {
    products: Product[];
};
export type GetProductRequest = void;
export type GetProductResponse = Product;
export type GetSearchCountsRequest = Omit<SearchProductsRequest, 'page' | 'group'>;
export interface GetSearchCountsResponse {
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
}
export type ProductViwedParams = {
    productId: string;
};
export type ProductViewedRequest = void;
export type ProductViewedResponse = Record<string, never>;
