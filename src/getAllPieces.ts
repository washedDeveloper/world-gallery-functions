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
  try {
    const snapshot = await galleryRef.get();
    if (snapshot.exists) {
      const data = snapshot.data();
      if (data) {
        // iterate through list of pieces and add piece metadata from piece gallery
        let allPieces: any[] = [];
        let pieceIds: string[] = [];
        data.pieces.forEach((piece: { id: string }) => {
          pieceIds.push(piece.id);
        });
        await asyncForEach(pieceIds, async (id: string) => {
          const piece = await getPiece(db, id);
          allPieces = [...allPieces, piece];
        });
        console.log(allPieces);

        return res.status(200).json({
          error: false,
          message: "successfully found all users pieces from gallery",
          data: allPieces,
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
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "error",
    });
  }
};

const getPiece = async (db: FirebaseFirestore.Firestore, id: string) => {
  const piecesSnapshot = await db.collection("pieces").doc(id).get();
  const pieceData = piecesSnapshot.data();
  return pieceData;
};

const asyncForEach = async (array: any[], callback: Function) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export default getAllPieces;
