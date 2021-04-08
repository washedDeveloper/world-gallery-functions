import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
import createUser from "./createUser";
import updateUser from "./updateUser";
import * as express from "express";
import * as cors from "cors";

const app = express();

app.use(express.json);
app.use(cors());
app.post("/updateUser", updateUser);
app.get("/", (req, res) => {
  res.send("hello");
});

exports.createUser = createUser;
exports.api = functions.https.onRequest(app);
