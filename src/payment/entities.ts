export interface Transaction {
  id: string;
  listingId?: string;
  orderId?: string;
  date: Date;
  type: string;
  amount: number;
  fees: number;
  currency: string;
}
