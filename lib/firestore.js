import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const firestore = initFirestore({
  credential: cert({
    projectId: "billsvector-96eaf",
    clientEmail: "abdulsalamahmed737@gmail.com",
    privateKey: "AIzaSyAdq-8Jme8x-Gq0Xb3CEJR3UT-Q077gXWk",
  }),
});