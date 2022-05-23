import firebase from "firebase";
const firebaseConfig = {
  apiKey: "SWWegivaUQnWM8xecU07gkZvILeTWVz5gSkhMPmP",
  authDomain: "dwf-m6-8b53d.firebaseapp.com",
  databaseURL: "https://piedra-papel-tijeras-apxm6-default-rtdb.firebaseio.com",
};

const app = firebase.initializeApp(firebaseConfig);
const rtdb = firebase.database();

export { rtdb };
