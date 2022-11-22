import { Game, Platform, ProductType } from '../product';
import { Order, Status } from '../order';
import { Listing, Condition, Region } from '../listing';
import { User, UserLevel } from '../user';
import { Merchant } from '../merchant';

export const exampleBoxArt =
  'http://www.boxmygames.com/wp-content/uploads/2015/07/Mario-Kart-64-2.jpg';

export const user: User = {
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
    condition: null,
    includeProtection: null,
    instructions: null,
    region: null,
  },
  verified: true,
};

export const merchant: Merchant = {
  username: user.username,
  id: '1',
  accountNumber: '889',
  balance: 0,
  currency: 'GBP',
  onboarded: true,
};

export const platform: Platform = {
  id: 'nintendo-64',
  banner: '',
  cover: '',
  name: 'Nintendo 64',
  rawgId: 1,
  releaseDate: new Date(),
  type: ProductType.PLATFORM,
  marketPrice: 0,
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
  marketPrice: 0,
};

export const listing: Listing = {
  id: 'listing-id-1',
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
  stats: {
    boxed: true,
    condition: Condition.LIKE_NEW,
    region: Region.PAL,
    instructions: true,
  },
};

export const order: Order = {
  id: 'order-id-1',
  created: new Date(),
  deliveryAddress: null,
  errorCode: '',
  listingId: listing.id,
  username: user.username,
  status: Status.OPEN,
  postedDate: new Date(),
  trackingNumber: '',
  trackingProvider: '',
  useBalance: false,
};
