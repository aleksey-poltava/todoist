import { useState, useEffect } from "react";
import { database } from "../firebasedata";
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from "moment";

export async function useTasks(selectedProject) {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        

        let unsubscribe = database
                            .collection();
        
        return () => unsubscribe();
    }, []);

    return {tasks, archivedTasks};
};

export async function useProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        
    }, [projects]);
};

async function getTasksByProjectAndUser(projectId = '1', userId = 'dfgreg34qg') {
    const projectsRef = collection(database, 'projects');
    const q = query(projectsRef,
                    where("userid", "==", userId),
                    where("projectid", "==", projectId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });

    return querySnapshot;
}

async function getProjectsByUser(userId = "dfgreg34qg") {
    const projectsRef = collection(database, 'projects');
    const q = query(projectsRef, where("userid", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });

    return querySnapshot;
}