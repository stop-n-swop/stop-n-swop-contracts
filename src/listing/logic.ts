import { Listing } from "./entities";

/** Returns the base price of the listing, not including postage */
export const getBasePrice = (listing: Listing) => {
  return listing.price;
};

/** Returns the postage fee of the listing */
export const getPostage = (listing: Listing) => {
  return listing.postage;
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
      total * (listing.discount.percentage / 100)
    );
    discount += percDiscount;
  }
  if (listing.discount.fixed) {
    discount += listing.discount.fixed;
  }
  return discount;
};

/** Returns the total price set by the seller, i.e. base price + postage */
export const getListedPrice = (listing: Listing) => {
  return getBasePrice(listing) + getPostage(listing);
};

const getRawProtectionCharge = (listing: Listing) => {
  return Math.ceil(getListedPrice(listing) * 0.04);
};

const getRawPlatformCharge = (listing: Listing) => {
  return Math.ceil(getListedPrice(listing) * 0.04) + 30;
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

/** Returns the actual price the customer will pay i.e. price + postage */
export const getFinalPrice = (listing: Listing) => {
  return getListedPrice(listing);
};

/** Returns the price that will show on the storefront. This is like getFinalPrice but without postage */
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
export const getProviderPayInCharge = (listing: Listing) => {
  return Math.ceil(getFinalPrice(listing) * 0.029) + 30;
};

/** Calculates the payout charge of any amount */
export const calculateProviderPayOutCharge = (amount: number) => {
  return Math.ceil(amount * 0.02);
};

/** the amount paypal charges on pay out */
export const getProviderPayOutCharge = (listing: Listing) => {
  return calculateProviderPayOutCharge(getListingProfit(listing));
};

/** Returns the amount we expect the payment provider to charge */
export const getProviderCharges = (listing: Listing) => {
  return getProviderPayInCharge(listing) + getProviderPayOutCharge(listing);
};

/** Returns the amount sns will have after the payment provider has taken its cut */
export const getProfit = (listing: Listing) => {
  return getTotalCharges(listing) - getProviderCharges(listing);
};
