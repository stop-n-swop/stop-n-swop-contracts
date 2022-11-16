import type { Listing } from './entities';

// Pay Stripe 1.4%
const PROVIDER_PAY_IN_PERC = 0.014;
// Pay Stripe 20p
const PROVIDER_PAY_IN_FIXED = 20;
// No payout fees for stripe
const PROVIDER_PAY_OUT_PERC = 0;
const PROVIDER_PAY_OUT_FIXED = 0;

// Pay SNS % buyer protection fee
const PROTECTION_PERC = 0.04;
const PROTECTION_FIXED = 20;
// Pay SNS % platform fee
const PLATFORM_PERC = 0;
// Pay SNS fixed fee
const PLATFORM_FIXED = 0;
// Pay out fee
const PAYOUT_FIXED = 20;

type Opts = { useBalance?: boolean; balance?: number };

/** Returns the base price of the listing, not including postage */
export const getBasePrice = (listing: Listing) => {
  return listing.price;
};

/** Returns the postage fee of the listing */
export const getPostage = (listing: Listing) => {
  return listing.postage;
};

/** Returns the total price set by the seller, i.e. base price + postage */
export const getSellPrice = (listing: Listing) => {
  return getBasePrice(listing) + getPostage(listing);
};

/** Returns the amount of order protection that will be added to the listed price */
export const getProtectionCharge = (listing: Listing) => {
  const listedPrice = getSellPrice(listing);
  return Math.ceil(listedPrice * PROTECTION_PERC) + PROTECTION_FIXED;
};

/** Returns the total price for the listing (base + postage + protection) */
export const getBuyPrice = (listing: Listing) => {
  return getSellPrice(listing) + getProtectionCharge(listing);
};

/** The amount of account balance the customer can use to pay for a listing */
export const getBalanceUsed = (listing: Listing, opts: Opts) => {
  if (opts?.useBalance && opts.balance > 0) {
    return Math.min(opts.balance, getBuyPrice(listing));
  }
  return 0;
};

/** Returns the total platform charge that will be deducted from the listed price */
export const getPlatformCharge = (listing: Listing) => {
  return Math.ceil(getSellPrice(listing) * PLATFORM_PERC) + PLATFORM_FIXED;
};

/** Returns the actual price the customer will pay i.e. price + postage + protection - credit */
export const getFinalPrice = (listing: Listing, opts: Opts) => {
  return getBuyPrice(listing) - getBalanceUsed(listing, opts);
};

/** Returns the price that will show on the storefront. This is like getSellPrice but without postage */
export const getDisplayPrice = (listing: Listing) => {
  return getBuyPrice(listing);
};

/** Returns the amount the seller will receive for a listing */
export const getListingProfit = (listing: Listing) => {
  return getSellPrice(listing) - getPlatformCharge(listing);
};

/** Returns the total cut sns will take from the buyer and the seller */
export const getTotalCharges = (listing: Listing) => {
  return getPlatformCharge(listing) + getProtectionCharge(listing);
};

// These are all just speculative of course
/** The amount stripe charges on pay in */
export const getProviderPayInCharge = (listing: Listing, opts: Opts) => {
  const finalPrice = getFinalPrice(listing, opts);
  const variableFee = Math.ceil(finalPrice * PROVIDER_PAY_IN_PERC);
  const fixedFee = PROVIDER_PAY_IN_FIXED;
  return variableFee + fixedFee;
};

/** Calculates the payout charge of any amount */
export const calculateProviderPayOutCharge = (amount: number) => {
  return Math.ceil(amount * PROVIDER_PAY_OUT_PERC) + PROVIDER_PAY_OUT_FIXED;
};

/** the amount paypal charges on pay out */
export const getProviderPayOutCharge = (listing: Listing) => {
  return calculateProviderPayOutCharge(getListingProfit(listing));
};

/** Returns the amount we expect the payment provider to charge */
export const getProviderCharges = (listing: Listing, opts: Opts) => {
  return (
    getProviderPayInCharge(listing, opts) + getProviderPayOutCharge(listing)
  );
};

/** Returns the amount sns will have after the payment provider has taken its cut */
export const getProfit = (listing: Listing, opts: Opts) => {
  return getTotalCharges(listing) - getProviderCharges(listing, opts);
};

/** Returns the amount SNS will deduct from a withdrawal */
export const getPayoutCharges = (_amount: number) => PAYOUT_FIXED;
