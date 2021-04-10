import * as express from "express";
import * as admin from "firebase-admin";

// GET /getAllPieces?user=
const getAllPieces = async (req: express.Request, res: express.Response) => {
  if (!req.query.user) {
    return res.status(500).json({
      error: true,
      messag: "missing user query. try add ?user=USERID",
    });
  }
  const db = admin.firestore();
  const galleryRef = db.collection("galleries").doc(`${req.query.user}`);
  const snapshot = await galleryRef.get();
  if (snapshot.exists) {
    const data = snapshot.data();
    if (data) {
      return res.status(200).json({
        error: false,
        message: "successfully found all users pieces from gallery",
        data: data,
      });
    }
    return res.status(500).json({
      error: true,
      message: "error getting document data",
    });
  }
  return res.status(404).json({
    error: true,
    message: "could not find gallery",
  });
};

export default getAllPieces;
