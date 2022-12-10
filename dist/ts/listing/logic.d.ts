import type { Listing } from './entities';
type Opts = {
    useBalance?: boolean;
    balance?: number;
};
/** Returns the base price of the listing, not including postage */
export declare const getBasePrice: (listing: Pick<Listing, 'price'>) => number;
/** Returns the postage fee of the listing */
export declare const getPostage: (listing: Pick<Listing, 'postage'>) => number;
/** Returns the total price set by the seller, i.e. base price + postage */
export declare const getSellPrice: (listing: Pick<Listing, 'postage' | 'price'>) => number;
/** Returns the amount of order protection that will be added to the listed price */
export declare const getProtectionCharge: (listing: Pick<Listing, 'postage' | 'price'>) => number;
/** Returns the total price for the listing (base + postage + protection) */
export declare const getBuyPrice: (listing: Pick<Listing, 'price' | 'postage'>) => number;
/** The amount of account balance the customer can use to pay for a listing */
export declare const getBalanceUsed: (listing: Pick<Listing, 'price' | 'postage'>, opts: Opts) => number;
/** Returns the total platform charge that will be deducted from the listed price */
export declare const getPlatformCharge: (listing: Pick<Listing, 'price' | 'postage'>) => number;
/** Returns the actual price the customer will pay i.e. price + postage + protection - credit */
export declare const getFinalPrice: (listing: Pick<Listing, 'price' | 'postage'>, opts: Opts) => number;
/** Returns the price that will show on the storefront. This is like getSellPrice but without postage */
export declare const getDisplayPrice: (listing: Pick<Listing, 'price' | 'postage'>) => number;
/** Returns the amount the seller will receive for a listing */
export declare const getListingProfit: (listing: Pick<Listing, 'price' | 'postage'>) => number;
/** Returns the total cut sns will take from the buyer and the seller */
export declare const getTotalCharges: (listing: Pick<Listing, 'price' | 'postage'>) => number;
/** The amount stripe charges on pay in */
export declare const getProviderPayInCharge: (listing: Pick<Listing, 'price' | 'postage'>, opts: Opts) => number;
/** Returns the amount we expect the payment provider to charge */
export declare const getProviderCharges: (listing: Pick<Listing, 'price' | 'postage'>, opts: Opts) => number;
/** Returns the amount sns will have after the payment provider has taken its cut */
export declare const getProfit: (listing: Pick<Listing, 'price' | 'postage'>, opts: Opts) => number;
/** Returns the amount SNS will deduct from a withdrawal */
export declare const getPayoutCharges: (_amount: number) => number;
export {};
