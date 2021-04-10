import * as express from "express";
import * as admin from "firebase-admin";

const discoverAll = async (req: express.Request, res: express.Response) => {
  const db = admin.firestore();
  try {
    const allRef = await db.collection("users");
    const snapshot = await allRef.get();
    if (!snapshot.empty) {
      let data: any[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return res.status(200).json({
        error: false,
        message: "successfully retrived all documents",
        data: data,
      });
    }
    return res.status(500).json({
      error: true,
      message: "failed to retrieve all documents",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "failed to retrieve all documents",
    });
  }
};

export default discoverAll;
