import { database } from "../firebase";

export function getDataFromFireStore(uid) {
  const { userItems } = database;

  return userItems.doc(uid).get();
}
