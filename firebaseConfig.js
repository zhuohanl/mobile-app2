import * as firebase from "firebase";
import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_DATABASE_URL,
  FB_STORAGE_BUCKET
} from "react-native-dotenv";

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DATABASE_URL,
  storageBucket: FB_STORAGE_BUCKET
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default (!firebase.apps.length ? firebaseApp : firebase.app());
