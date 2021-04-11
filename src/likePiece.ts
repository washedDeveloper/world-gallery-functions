import * as express from "express";
import * as admin from "firebase-admin";

/**
 * {
 *  uid,
 *  pieceId
 * }
 */
const likePiece = async (req: express.Request, res: express.Response) => {
  const db = admin.firestore();
  const piece = db.collection("pieces").doc(`${req.body.id}`);
  if (piece) {
    try {
      await piece.update({
        likes: admin.firestore.FieldValue.increment(1),
      });
      return res.status(200).json({
        error: false,
        message: "successfully liked piece",
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "failed to like piece",
      });
    }
  }
  return res.status(404).json({
    error: true,
    message: "piece not found",
  });
};

export default likePiece;
