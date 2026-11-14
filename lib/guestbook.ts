/*
  The guestbook's shared vocabulary — the entry shape and the limits the form
  enforces in the browser and the route enforces again on the server.

  It is a separate module from the store on purpose: the sign-in form imports
  these, and the store imports node:crypto and the Redis client. One file for
  both would pull all of that into the client bundle for the sake of two
  numbers.
*/

export type Entry = {
  id: string;
  name: string;
  message: string;
  /** Epoch milliseconds. Formatted on the client, in the reader's locale. */
  at: number;
};

export const MAX_NAME = 32;
export const MAX_MESSAGE = 180;

/** How many notes the homepage wall shows, and how many /notes loads at a time. */
export const WALL_SIZE = 50;
export const PAGE_SIZE = 60;
