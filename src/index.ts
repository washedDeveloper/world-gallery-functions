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
import discoverAll from "./discoverAll";
import likePiece from "./likePiece";

const app = express();

app.use(express.json());
app.use(cors());
app.post("/updateUser", updateUser);
app.get("/search", search);
app.post("/addPiece", addPiece);
app.get("/getAllPieces", getAllPieces);
app.get("/discoverAll", discoverAll);
app.post("/likePiece", likePiece);

exports.createUser = createUser;
exports.api = functions.https.onRequest(app);
