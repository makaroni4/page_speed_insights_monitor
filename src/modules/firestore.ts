import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

export interface FirestoreConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export class Firestore {
  db: any;

  constructor(config: FirestoreConfig) {
    const app = initializeApp(config);

    this.db = getFirestore(app);
  }

  async getPages() {
    const col = collection(this.db, "pages");
    const pagesSnapshot = await getDocs(col);
    const pages = pagesSnapshot.docs.map(doc => doc.data());

    return pages;
  }
}
