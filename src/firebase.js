// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyCnLaNR2qdwFCIYQQitL7okH-fEZvG0EPY",
  authDomain: "fb-crud-react-1ba79.firebaseapp.com",
  projectId: "fb-crud-react-1ba79",
  storageBucket: "fb-crud-react-1ba79.appspot.com",
  messagingSenderId: "910418806174",
  appId: "1:910418806174:web:605dc62b7c230f37b3828f"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y exporta la referencia de la base de datos
export const db = getFirestore(app);
