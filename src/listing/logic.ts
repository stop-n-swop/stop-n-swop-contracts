import type { Listing } from './entities';

// Pay Stripe 1.4%
const PROVIDER_PAY_IN_PERC = 0.014;
// Pay Stripe 20p
const PROVIDER_PAY_IN_FIXED = 20;
// No payout fees for stripe
const PROVIDER_PAY_OUT_PERC = 0;
const PROVIDER_PAY_OUT_FIXED = 0;

// Pay SNS 3% buyer protection fee
const PROTECTION_PERC = 0.03;
const PROTECTION_FIXED = 0;
// Pay SNS 3% platform fee
const PLATFORM_PERC = 0.03;
// Pay SNS 20p fixed fee
const PLATFORM_FIXED = 20;

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
export const getListedPrice = (listing: Listing) => {
  return getBasePrice(listing) + getPostage(listing);
};

/** The amount of account balance the customer can use to pay for a listing */
export const getBalanceUsed = (listing: Listing, opts: Opts) => {
  if (opts?.useBalance && opts.balance > 0) {
    return Math.min(opts.balance, getListedPrice(listing));
  }
  return 0;
};

/** Returns the discount amount */
export const getDiscount = (listing: Listing) => {
  let discount = 0;
  if (!listing.discount) {
    return discount;
  }
  const total = getListedPrice(listing);
  if (listing.discount.percentage) {
    const percDiscount = Math.floor(
      total * (listing.discount.percentage / 100),
    );
    discount += percDiscount;
  }
  if (listing.discount.fixed) {
    discount += listing.discount.fixed;
  }
  return discount;
};

const getRawProtectionCharge = (listing: Listing) => {
  return (
    Math.ceil(getListedPrice(listing) * PROTECTION_PERC) + PROTECTION_FIXED
  );
};

const getRawPlatformCharge = (listing: Listing) => {
  return Math.ceil(getListedPrice(listing) * PLATFORM_PERC) + PLATFORM_FIXED;
};

/** Returns the amount of order protection that will be deducted from the listed price */
export const getProtectionCharge = (listing: Listing) => {
  // discounts are first deducted from the platform charge, any remaining is then deducted from the protection charge
  // calculate the amount of discount remaining after the platform charge
  // and then take that off the protection charge
  const platformCharge = getRawPlatformCharge(listing);
  const fullDiscount = getDiscount(listing);
  // you can't discount more than 100% of the fees!
  const discount = Math.max(fullDiscount - platformCharge, 0);
  const protection = getRawProtectionCharge(listing);

  return Math.max(protection - discount, 0);
};

/** Returns the total platform charge that will be deducted from the listed price */
export const getPlatformCharge = (listing: Listing) => {
  const charge = getRawPlatformCharge(listing);
  const discount = getDiscount(listing);
  return Math.max(charge - discount, 0);
};

/** Returns the actual price the customer will pay i.e. price + postage - credit */
export const getFinalPrice = (listing: Listing, opts: Opts) => {
  return getListedPrice(listing) - getBalanceUsed(listing, opts);
};

/** Returns the price that will show on the storefront. This is like getListedPrice but without postage */
export const getDisplayPrice = (listing: Listing) => {
  return getBasePrice(listing);
};

/** Returns the amount sns will charge the seller (i.e. order protection + platform charge) */
export const getListingCharges = (listing: Listing) => {
  return getProtectionCharge(listing) + getPlatformCharge(listing);
};

/** Returns the amount the seller will receive for a listing */
export const getListingProfit = (listing: Listing) => {
  return getListedPrice(listing) - getListingCharges(listing);
};

/** Returns the total cut sns will take from the buyer and the seller */
export const getTotalCharges = (listing: Listing) => {
  return getListingCharges(listing);
};

// These are all just speculative of course
/** The amount paypal charges on pay in */
export const getProviderPayInCharge = (listing: Listing, opts: Opts) => {
  return (
    Math.ceil(getFinalPrice(listing, opts) * PROVIDER_PAY_IN_PERC) +
    PROVIDER_PAY_IN_FIXED
  );
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
