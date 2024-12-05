import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import Constants from "expo-constants";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';        

// Firebase config
// const firebaseConfig = {
//   apiKey: Constants.expoConfig.extra.apiKey,
//   authDomain: Constants.expoConfig.extra.authDomain,
//   projectId: Constants.expoConfig.extra.projectId,
//   storageBucket: Constants.expoConfig.extra.storageBucket,
//   messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
//   appId: Constants.expoConfig.extra.appId,
//   databaseURL: Constants.expoConfig.extra.databaseURL,
//   //   @deprecated is deprecated Constants.manifest
// };

const firebaseConfig = {
  apiKey: "AIzaSyBQD0C2CQC5JxnLTCHj5arAxmGPJ7XBrBU",
  authDomain: "indiana-tech.firebaseapp.com",
  projectId: "indiana-tech",
  storageBucket: "indiana-tech.firebasestorage.app",
  messagingSenderId: "1005755732298",
  appId: "1:1005755732298:web:0f99150b0d5f2236c3f1b3"
};
// initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const database = getFirestore();