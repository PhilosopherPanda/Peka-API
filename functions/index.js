const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

const serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://inner-lightning-313406.firebaseio.com",
});
const db = admin.firestore();

app.get("/api/articles", (req, res) => {
  (async () => {
    try {
      const query = db.collection("artikel");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            article_url: doc.data().article_url,
            deskripsi: doc.data().deskripsi,
            foto_url: doc.data().foto_url,
            judul: doc.data().judul,
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/api/motivation", (req, res) => {
  (async () => {
    try {
      const query = db.collection("motivation");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            item: doc.data().quote,
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});
app.get("/api/motivation/:motivation_id", (req, res) => {
  (async () => {
    try {
      // eslint-disable-next-line max-len
      const document = db.collection("motivation").doc(req.params.motivation_id);
      const item = await document.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/api/videos", (req, res) => {
  (async () => {
    try {
      const query = db.collection("video");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            judul: doc.data().judul,
            thumbnail: doc.data().thumbnail,
            video_url: doc.data().video_url,
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
