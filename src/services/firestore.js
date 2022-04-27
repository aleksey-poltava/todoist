import { initializeApp } from "firebase/app";
import { 
    getFirestore,
    query,
    orderBy,
    onSnapshot,
    collection,
    getDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    doc,
    where,
    serverTimestamp, 
    arrayUnion
} from "firebase/firestore";

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

export const getTaskList = (projectId = '1', userId = 'dfgreg34qg') => {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef,
        where("userid", "==", userId),
        where("projectid", "==", projectId));
    return getDocs(q);
};

export const getTasksByProjectAndUser = (projectId = '1', userId = 'dfgreg34qg') => {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef,
                    where("userid", "==", userId),
                    where("projectid", "==", projectId));

    const querySnapshot = getDocs(q);
    // querySnapshot.then(docs => {
    //     docs.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     })
    // });
    
    return querySnapshot;
}


export const createGroceryList = (userName, userId) => {
    const groceriesColRef = collection(db, 'groceryLists')
    return addDoc(groceriesColRef, {
            created: serverTimestamp(),
            createdBy: userId,
            users: [{ 
                userId: userId,
                name: userName
            }]
        });
};

export const getGroceryList = (groceryListId) => {
    const groceryDocRef = doc(db, 'groceryLists', groceryListId)
    return getDoc(groceryDocRef);
};

export const getGroceryListItems = (groceryListId) => {
    const itemsColRef = collection(db, 'groceryLists', groceryListId, 'items')
    return getDocs(itemsColRef)
}

export const streamGroceryListItems = (groceryListId, snapshot, error) => {
    const itemsColRef = collection(db, 'groceryLists', groceryListId, 'items')
    const itemsQuery = query(itemsColRef, orderBy('created'))
    return onSnapshot(itemsQuery, snapshot, error);
};