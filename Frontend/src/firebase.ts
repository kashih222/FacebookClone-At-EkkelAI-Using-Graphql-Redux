import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBL72WeCJL4oB-34PACPjWFA6kZrVftSFI",
  authDomain: "fbclone-53643.firebaseapp.com",
  projectId: "fbclone-53643",
  storageBucket: "fbclone-53643.appspot.com",
  messagingSenderId: "277893039598",
  appId: "1:277893039598:web:ac7c3caa849b2b029dfaff",
  databaseURL: "https://fbclone-53643-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("No user, attempting anonymous sign-in...");
    signInAnonymously(auth)
      .then(() => console.log("Anonymous sign-in successful"))
      .catch((error) => {
        console.error("Anonymous sign-in failed:", error.code, error.message);
      });
  } else {
    console.log("User is signed in:", user.uid);
  }
});
export default app;
