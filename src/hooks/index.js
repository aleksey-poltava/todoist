import { useState, useEffect } from "react";
import * as FirestoreService from '../services/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import moment from "moment";

import {getTasksByProjectAndUser} from '../services/firestore';

function useTasks(selectedProject) {

    const t = [
        {
            'id': 'dsgdfgdf',
            'archived': false,
            'date': '27-04-2022',
            'projectid': '1',
            'task': 'It is task 1',
            'userid': 'dfgreg34qg'
        },
        {
            'id': 'dsgdfgdw4g',
            'archived': false,
            'date': '29-04-2022',
            'projectid': '1',
            'task': 'It is task 2',
            'userid': 'dfgreg34qg'
        },
    ];

    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        (async () => {
            const taskList = await getTasksByProjectAndUser('1', 'dfgreg34qg');            
            const newTasks = taskList.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));
            setTasks(newTasks);
          })();
 
        return () => {
            console.log('Need to disconnect database');
        };
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

// async function getProjectsByUser(userId = "dfgreg34qg") {
//     const projectsRef = collection(database, 'projects');
//     const q = query(projectsRef, where("userid", "==", userId));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });

//     return querySnapshot;
// }

export {useTasks};