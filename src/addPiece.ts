import * as express from "express";
import * as admin from "firebase-admin";

const addPiece = async (req: express.Request, res: express.Response) => {
  const db = admin.firestore();
  const userGallery = db.collection("galleries").doc(`${req.body.uid}`);
  if (userGallery) {
    try {
      await userGallery.update({
        pieces: admin.firestore.FieldValue.arrayUnion({
          description: req.body.description,
          imageURL: req.body.imageURL,
          likes: 0,
          title: req.body.title,
          fileName: req.body.fileName,
        }),
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
