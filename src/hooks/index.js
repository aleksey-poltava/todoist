import { useState, useEffect } from "react";
import moment from "moment";

import {getTasksByProjectAndUser, getProjectsByUser} from '../services/firestore';

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
            console.log('Need to disconnect database in Tasks');
        };
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

const useProjects = () => {
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
        (async () => {
            const projectList = await getProjectsByUser('dfgreg34qg');            
            const allProjects = projectList.docs.map(project => ({                
                ...project.data(),
                docId: project.id,
            }));
            if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                setProjects(allProjects);
            };

        })();
 
        return () => {
            console.log(projects);
            console.log('Need to disconnect database in projects');
        };
    }, [projects]);
  
    return { projects, setProjects };
};
  

export {useTasks, useProjects};