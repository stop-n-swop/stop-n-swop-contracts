import type { ProductType } from './enums';
export interface Manufacturer {
    id: string;
    name: string;
}
export interface Product {
    type: ProductType;
    id: string;
    name: string;
    cover: string;
    banner: string;
    releaseDate: Date;
    price: {
        spot: number;
        mint: number;
        cib: number;
        loose: number;
    };
}
export interface Game extends Product {
    type: ProductType.GAME;
    rawgId: number;
    gameId: string;
    platformId: string;
    platformIds: string[];
    developer: Company;
    publisher: Company;
}
export interface Platform extends Product {
    type: ProductType.PLATFORM;
    rawgId: number;
    shortName: string;
}
export interface Company {
    id: string;
    name: string;
}
