/* eslint-disable camelcase */
import { ErrorMessage, Message, Signal } from '../utils';

export type ImageSignals = {
  // WRITE
  upload_image: Signal<{
    authToken: string;
    size: number;
    path: string;
    filename: string;
    mimetype: string;
  }>;
  amend_image: Signal<{
    authToken: string;
    id: string;
    height: number;
    width: number;
    left: number;
    top: number;
    rotate: number;
  }>;
  verify_image: Signal<{
    authToken: string;
    listingId: string;
    index: number;
    approved: boolean;
    reason: string;
  }>;
  purge_images: Signal;
  delete_image: Signal<{ authToken: string; id: string }>;
};

export type ImageMessages = {
  // WRITE
  image_uploaded: Message<{ id: string }>;
  upload_image_failed: ErrorMessage;
  image_amended: Message<{ lastId: string; id: string }>;
  amend_image_failed: ErrorMessage<{ id: string }>;
  image_verified: Message<{ listingId: string; index: number }>;
  image_approved: Message<{
    listingId: string;
    index: number;
    userId: string;
  }>;
  image_rejected: Message<{
    listingId: string;
    index: number;
    userId: string;
    reason: string;
  }>;
  image_deleted: Message<{ id: string }>;
  delete_image_failed: ErrorMessage<{ id: string }>;
};
