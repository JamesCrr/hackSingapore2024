import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// Add SDKs for Firebase products that you want to use, https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
// Initialize Firebase, Firestore
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// Start express
const app = express();
app.use(cors());
app.use(express.json());

// SAMPLE GET
app.get("/users", async (req, res) => {
  const usersList = [];

  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    usersList.push(doc.data());
  });

  res.json({ users: usersList });
});

// SAMPLE ADD
app.post("/user", async (req, res) => {
  const body = req.body;

  try {
    const docRef = await addDoc(collection(firestore, "users"), {
      name: body.name,
      password: body.password,
      age: body.age,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  res.send("Success Add");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
