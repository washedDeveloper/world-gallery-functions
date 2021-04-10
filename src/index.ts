import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
import createUser from "./createUser";
import * as express from "express";
import * as cors from "cors";
import updateUser from "./updateUser";
import addPiece from "./addPiece";
import search from "./search";
import getAllPieces from "./getAllPieces";

const app = express();

app.use(express.json());
app.use(cors());
app.post("/updateUser", updateUser);
app.get("/search", search);
app.post("/addPiece", addPiece);
app.get("/getAllPieces", getAllPieces);

exports.createUser = createUser;
exports.api = functions.https.onRequest(app);
