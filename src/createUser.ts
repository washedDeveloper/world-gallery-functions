import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import user from "./types/user";

const createUser = functions.auth.user().onCreate(async (user) => {
  functions.logger.info("creating user");
  const db = admin.firestore();
  const emptyUser: user = {
    name: user.displayName || "",
    description: "",
    latitude: 0,
    longitude: 0,
  };

  return await db.collection("users").doc(user.uid).set(emptyUser);
});

export default createUser;
