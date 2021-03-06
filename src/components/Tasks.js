import React from "react";
import { Checkbox } from "./Checkbox";
import { useTasks } from "../hooks";
import {collatedTasks} from '../constants';
import { useTasks } from "../hooks";
import { useSelectedProjectValue, useProjectsValue } from "../context";

export const Tasks = () => {
    //const {tasks, archivedTasks} = useTasks('1'); // project id == 1
    const {selectedProject} = useSelectedProjectValue();
    const {projects} = useProjectsValue();
    const {tasks} = useTasks(selectedProject);

    let projectName = '';

    if (projects && selectedProject && !collatedTasks(selectedProject)) {
        projectName = getTitle(projects, selectedProject).name;
    }

    if (collatedTasksExists(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    }


    return(
        <div className='tasks' data-testid='tasks'>
            <h2 data-testid='project-name'>{projectName}</h2>

            <ul className="tasks__list">
                {tasks.map((task) => (
                <li key={`${task.id}`}>
                    <Checkbox id={task.id} taskDesc={task.task} />
                    <span>{task.task}</span>
                </li>
                ))}
            </ul>
        </div>
    );
}