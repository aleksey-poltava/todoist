import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDywy6O1mIGlefQklI9xzpBSmfbfdEhCv0",
    authDomain: "todoist-be122.firebaseapp.com",
    projectId: "todoist-be122",
    storageBucket: "todoist-be122.appspot.com",
    messagingSenderId: "1002134665940",
    appId: "1:1002134665940:web:907f77312222b7093b9941"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db as database};
