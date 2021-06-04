export enum Status {
  OPEN = "open", // the default - listing is open
  CLOSED = "closed", // listing has been closed by the seller
  CREATED = "created", // a buyer has purchased the listing and is waiting for approval
  APPROVED = "approved", // the seller has approved the transaction
  DECLINED = "declined", // the seller has declined the transaction
  PAID = "paid", // the transaction has succeeded
  NOT_PAID = "notPaid", // the transaction failed
  POSTED = "posted", // the seller has posted the item
  RECEIVED = "received", // the buyer has received the item
  CANCELLED = "cancelled", // the transaction has been cancelled by the buyer
}
