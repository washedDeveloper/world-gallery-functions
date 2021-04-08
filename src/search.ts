import * as express from "express";
import * as admin from "firebase-admin";

const search = async (req: express.Request, res: express.Response) => {
  console.log(req.query);
  if (req.query.name === undefined || req.query.name === null) {
    return res.status(500).json({
      error: true,
      message: "name query not found. try adding ?name={username}",
    });
  }
  const db = admin.firestore();
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("name", "==", req.query.name).get();
  if (snapshot.empty) {
    return res.status(404).json({
      error: true,
      message: `no users found with name: ${req.query.name}`,
    });
  }
  let foundUsers: any[] = [];
  snapshot.forEach((doc) => {
    foundUsers.push(doc.data());
  });
  return res.status(200).json({
    error: false,
    message: `found user with name: ${req.query.name}`,
    data: foundUsers,
  });
};

export default search;
