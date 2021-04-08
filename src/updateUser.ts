import * as express from "express";
import * as admin from "firebase-admin";

const updateUser = async (req: express.Request, res: express.Response) => {
  const db = admin.firestore();
  const user = db.collection("users").doc(`${req.body.uid}`);
  if (user) {
    try {
      await user.update({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description,
        name: req.body.name,
      });
      return res.status(200).json({
        error: false,
        message: "successfully updated user",
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: "failed to update user",
      });
    }
  } else {
    return res.status(404).json({
      error: true,
      message: "user not found",
    });
  }
};

export default updateUser;
