'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.Condition = void 0;
(function (Condition) {
  Condition["MINT"] = "mint";
  Condition["LIKE_NEW"] = "likeNew";
  Condition["USED"] = "used";
  Condition["POOR"] = "poor";
})(exports.Condition || (exports.Condition = {}));
exports.Region = void 0;
(function (Region) {
  Region["PAL"] = "pal";
  Region["NTSCU"] = "ntscu";
  Region["NTSCC"] = "ntscc";
  Region["NTSCJ"] = "ntscj";
})(exports.Region || (exports.Region = {}));
exports.VerifyStatus = void 0;
(function (VerifyStatus) {
  VerifyStatus["UNVERIFIED"] = "unverified";
  VerifyStatus["APPROVED"] = "approved";
  VerifyStatus["REJECTED"] = "rejected";
})(exports.VerifyStatus || (exports.VerifyStatus = {}));

const PROVIDER_PAY_IN_PERC = 0.014;
const PROVIDER_PAY_IN_FIXED = 20;
const PROTECTION_PERC = 0.04;
const PROTECTION_FIXED = 20;
const PLATFORM_PERC = 0;
const PLATFORM_FIXED = 0;
const PAYOUT_FIXED = 20;
const getBasePrice = listing => {
  return listing.price;
};
const getPostage = listing => {
  return listing.postage;
};
const getSellPrice = listing => {
  return getBasePrice(listing) + getPostage(listing);
};
const getProtectionCharge = listing => {
  const listedPrice = getSellPrice(listing);
  return Math.ceil(listedPrice * PROTECTION_PERC) + PROTECTION_FIXED;
};
const getBuyPrice = listing => {
  return getSellPrice(listing) + getProtectionCharge(listing);
};
const getBalanceUsed = (listing, opts) => {
  if (opts != null && opts.useBalance && opts.balance > 0) {
    return Math.min(opts.balance, getBuyPrice(listing));
  }
  return 0;
};
const getPlatformCharge = listing => {
  return Math.ceil(getSellPrice(listing) * PLATFORM_PERC) + PLATFORM_FIXED;
};
const getFinalPrice = (listing, opts) => {
  return getBuyPrice(listing) - getBalanceUsed(listing, opts);
};
const getDisplayPrice = listing => {
  return getBuyPrice(listing);
};
const getListingProfit = listing => {
  return getSellPrice(listing) - getPlatformCharge(listing);
};
const getTotalCharges = listing => {
  return getPlatformCharge(listing) + getProtectionCharge(listing);
};
const getProviderPayInCharge = (listing, opts) => {
  const finalPrice = getFinalPrice(listing, opts);
  if (finalPrice === 0) {
    return 0;
  }
  const variableFee = Math.ceil(finalPrice * PROVIDER_PAY_IN_PERC);
  const fixedFee = PROVIDER_PAY_IN_FIXED;
  return variableFee + fixedFee;
};
const getProviderCharges = (listing, opts) => {
  return getProviderPayInCharge(listing, opts);
};
const getProfit = (listing, opts) => {
  return getTotalCharges(listing) - getProviderCharges(listing, opts);
};
const getPayoutCharges = _amount => PAYOUT_FIXED;

const LAPSED_DAYS_THRESHOLD = 21;
const LAPSED_DAYS_WARNING = 14;

exports.Status = void 0;
(function (Status) {
  Status["VERIFYING"] = "verifying";
  Status["OPEN"] = "open";
  Status["CLOSED"] = "closed";
  Status["CREATED"] = "created";
  Status["PENDING"] = "pending";
  Status["PAYING"] = "paying";
  Status["NOT_PAID"] = "notPaid";
  Status["PLACED"] = "placed";
  Status["APPROVED"] = "approved";
  Status["DECLINED"] = "declined";
  Status["POSTED"] = "posted";
  Status["RECEIVED"] = "received";
  Status["DISPUTED"] = "disputed";
  Status["NOT_RECEIVED"] = "notReceived";
  Status["NO_RESPONSE"] = "noResponse";
  Status["RESOLVED"] = "resolved";
  Status["REFUNDED"] = "refunded";
  Status["COMPLETE"] = "complete";
  Status["CANCELLED"] = "cancelled";
})(exports.Status || (exports.Status = {}));

exports.ProductType = void 0;
(function (ProductType) {
  ProductType["GAME"] = "game";
  ProductType["PLATFORM"] = "platform";
})(exports.ProductType || (exports.ProductType = {}));

exports.OauthProvider = void 0;
(function (OauthProvider) {
  OauthProvider["TEST"] = "test";
  OauthProvider["GOOGLE"] = "google";
  OauthProvider["FACEBOOK"] = "facebook";
  OauthProvider["SSO"] = "sso";
})(exports.OauthProvider || (exports.OauthProvider = {}));
exports.UserLevel = void 0;
(function (UserLevel) {
  UserLevel[UserLevel["BLOCKED"] = 0] = "BLOCKED";
  UserLevel[UserLevel["USER"] = 1] = "USER";
  UserLevel[UserLevel["ADMIN"] = 9] = "ADMIN";
})(exports.UserLevel || (exports.UserLevel = {}));

const never = () => new Promise(() => {
});
const after = ms => new Promise(resolve => {
  setTimeout(resolve, ms);
});
const isEmpty = obj => {
  if (obj == null) {
    return true;
  }
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }
  if (typeof obj === 'string') {
    return obj === '';
  }
  return false;
};
const reduceObj = (obj, fn) => {
  const entries = Object.entries(obj);
  const reduced = entries.reduce((acc, _ref) => {
    let [key, value] = _ref;
    return fn(acc, key, value);
  }, []);
  const asObj = Object.fromEntries(reduced);
  return asObj;
};
const mapObj = (obj, fn) => {
  return reduceObj(obj, (acc, key, value) => {
    return [...acc, fn(key, value)];
  });
};
const filterObj = (obj, fn) => {
  return reduceObj(obj, (acc, key, value) => {
    if (fn(key, value)) {
      return [...acc, [key, value]];
    }
    return acc;
  });
};
const omit = (obj, keys) => {
  return filterObj(obj, key => !keys.includes(key));
};
const unique = arr => {
  return [...new Set(arr)];
};
const omitNullProperties = obj => {
  return filterObj(obj, (_key, value) => value != null);
};
const omitEmptyProperties = obj => {
  return filterObj(obj, (_key, value) => !isEmpty(value));
};
const sortBy = function (list, fn, direction) {
  if (direction === void 0) {
    direction = 'asc';
  }
  return list.slice().sort((a, b) => {
    const x = fn(a);
    const y = fn(b);
    if (direction === 'asc') {
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    }
    if (direction === 'desc') {
      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    }
    return 0;
  });
};
const isNumeric = x => {
  return x != null && !Number.isNaN(Number(x));
};
const t = p => {
  return p.then(result => {
    return [undefined, result];
  }, err => {
    return [err, undefined];
  });
};
function pipe() {
  for (var _len = arguments.length, fns = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    fns[_key2] = arguments[_key2];
  }
  return t => fns.reduce((t, fn) => fn(t), t);
}
function pipeAsync() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
    fns[_key3] = arguments[_key3];
  }
  return async t => {
    return fns.reduce(async (p, fn) => {
      return fn(await p);
    }, Promise.resolve(t));
  };
}
const reduceAsync = (arr, fn, initial) => {
  return arr.reduce(async (acc, v, i, arr) => {
    return fn(await acc, v, i, arr);
  }, Promise.resolve(initial));
};
function mapAsync(arr, fn) {
  return Promise.all(arr.map(fn));
}
async function mapSync(arr, fn) {
  return reduceAsync(arr, async (acc, v, i, arr) => {
    return [...acc, await fn(v, i, arr)];
  }, []);
}
async function filterAsync(arr, fn) {
  const els = await Promise.all(arr.map(async (v, i, arr) => {
    const check = await fn(v, i, arr);
    return {
      v,
      check
    };
  }));
  const result = [];
  els.forEach(_ref2 => {
    let {
      check,
      v
    } = _ref2;
    if (check) {
      result.push(v);
    }
  });
  return result;
}
async function forEachAsync(arr, fn) {
  await mapAsync(arr, fn);
}

exports.LAPSED_DAYS_THRESHOLD = LAPSED_DAYS_THRESHOLD;
exports.LAPSED_DAYS_WARNING = LAPSED_DAYS_WARNING;
exports.after = after;
exports.filterAsync = filterAsync;
exports.filterObj = filterObj;
exports.forEachAsync = forEachAsync;
exports.getBalanceUsed = getBalanceUsed;
exports.getBasePrice = getBasePrice;
exports.getBuyPrice = getBuyPrice;
exports.getDisplayPrice = getDisplayPrice;
exports.getFinalPrice = getFinalPrice;
exports.getListingProfit = getListingProfit;
exports.getPayoutCharges = getPayoutCharges;
exports.getPlatformCharge = getPlatformCharge;
exports.getPostage = getPostage;
exports.getProfit = getProfit;
exports.getProtectionCharge = getProtectionCharge;
exports.getProviderCharges = getProviderCharges;
exports.getProviderPayInCharge = getProviderPayInCharge;
exports.getSellPrice = getSellPrice;
exports.getTotalCharges = getTotalCharges;
exports.isEmpty = isEmpty;
exports.isNumeric = isNumeric;
exports.mapAsync = mapAsync;
exports.mapObj = mapObj;
exports.mapSync = mapSync;
exports.never = never;
exports.omit = omit;
exports.omitEmptyProperties = omitEmptyProperties;
exports.omitNullProperties = omitNullProperties;
exports.pipe = pipe;
exports.pipeAsync = pipeAsync;
exports.reduceAsync = reduceAsync;
exports.reduceObj = reduceObj;
exports.sortBy = sortBy;
exports.t = t;
exports.unique = unique;
