import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
import createUser from "./createUser";
import * as express from "express";
import * as cors from "cors";
import updateUser from "./updateUser";
import { addPiece } from "./addPiece";

const app = express();

app.use(express.json());
app.use(cors());
app.post("/updateUser", updateUser);

exports.createUser = createUser;
exports.addPiece = addPiece;
exports.api = functions.https.onRequest(app);
