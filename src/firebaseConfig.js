import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCczlE6dqBoJnhnnhWlaixU5ZuT_vml_Tk",
  authDomain: "circusapp-3a18f.firebaseapp.com",
  projectId: "circusapp-3a18f",
  storageBucket: "circusapp-3a18f.appspot.com",
  messagingSenderId: "660221020146",
  appId: "1:660221020146:web:cb9648e14d1058dc2a596b",
  measurementId: "G-VF7Z6T8D1F"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore
const db = getFirestore(app);

export { db };
