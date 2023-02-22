import { Game, Platform, ProductType } from '../product';
import { Order, Status } from '../order';
import { Listing, Region, VerifyStatus } from '../listing';
import { User, UserLevel } from '../user';
import { Merchant } from '../merchant';

export const exampleBoxArt =
  'http://www.boxmygames.com/wp-content/uploads/2015/07/Mario-Kart-64-2.jpg';

export const user: User = {
  userId: '1234',
  username: 'jb',
  address: {
    line1: 'Line 1',
    line2: 'Line 2',
    city: 'City',
    postcode: 'PST1 CDE',
    country: 'GB',
    location: 'London, UK',
  },
  merchantId: '1',
  created: new Date(),
  email: 'jb@sns.com',
  level: UserLevel.USER,
  logins: [],
  preferences: {
    manualApproval: false,
    noticeEmails: true,
    useBalance: true,
    boxed: null,
    includeProtection: null,
    instructions: null,
    new: null,
    region: null,
  },
  verified: true,
  rating: 0,
};

export const merchant: Merchant = {
  username: user.username,
  id: '1',
  accountNumber: '889',
  balance: 0,
  currency: 'GBP',
  onboarded: true,
  withdrawals: [],
};

export const platform: Platform = {
  id: 'nintendo-64',
  banner: '',
  cover: '',
  name: 'Nintendo 64',
  rawgId: 1,
  releaseDate: new Date(),
  type: ProductType.PLATFORM,
  price: { cib: 0, loose: 0, mint: 0, spot: 0 },
};

export const game: Game = {
  id: `${platform.id}-mario-kart-64`,
  banner: exampleBoxArt,
  cover: exampleBoxArt,
  developer: { id: 'nintendo', name: 'Nintendo' },
  publisher: { id: 'nintendo', name: 'Nintendo' },
  gameId: 'mario-kart-64',
  name: 'Mario Kart 64',
  platformId: platform.id,
  platformIds: [platform.id],
  rawgId: 0,
  releaseDate: new Date(),
  type: ProductType.GAME,
  price: { cib: 0, loose: 0, mint: 0, spot: 0 },
};

export const listing: Listing = {
  id: 'listing-id-1',
  userId: user.userId,
  createdDate: new Date(),
  completedDate: new Date(),
  currency: 'GBP',
  description: '',
  images: [exampleBoxArt],
  location: 'London, UK',
  postage: 0,
  price: 20000,
  productIds: [game.id],
  rating: 0,
  status: Status.OPEN,
  username: user.username,
  verified: VerifyStatus.APPROVED,
  stats: {
    boxed: true,
    region: Region.PAL,
    instructions: true,
    new: false,
  },
};

export const order: Order = {
  id: 'order-id-1',
  created: new Date(),
  deliveryAddress: null,
  errorCode: '',
  listingId: listing.id,
  userId: user.userId,
  username: user.username,
  status: Status.OPEN,
  postedDate: new Date(),
  trackingNumber: '',
  trackingProvider: '',
  useBalance: false,
  balanceUsed: 0,
};
