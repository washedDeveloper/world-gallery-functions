import * as express from "express";
import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";

const addPiece = async (req: express.Request, res: express.Response) => {
  const db = admin.firestore();
  const userGallery = db.collection("galleries").doc(`${req.body.uid}`);
  if (userGallery) {
    try {
      const pieceID = uuidv4();
      const pieces = db.collection("pieces").doc(pieceID);
      await userGallery.update({
        pieces: admin.firestore.FieldValue.arrayUnion({
          id: pieceID,
        }),
      });
      await pieces.set({
        title: req.body.title,
        description: req.body.description,
        fileName: req.body.fileName,
        imageURL: req.body.imageURL,
        likes: 0,
        uid: req.body.uid,
        id: pieceID,
      });
      return res.status(200).json({
        error: false,
        message: "sucessfully added piece to gallery",
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "failed to add piece to gallery",
      });
    }
  }
  return res.status(404).json({
    error: true,
    message: "no user found",
  });
};

export default addPiece;
