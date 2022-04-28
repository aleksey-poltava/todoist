import React, {useState} from "react";
import {FaTrashAlt} from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { deleteProjectById } from "../services/firestore";

export const IndividualProject = ({project}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const {projects, setProjects} = useProjectsValue();
    const {setSelectedProjects} = useSelectedProjectValue();

    const deleteProject = docId => {
        (async () => {
            await deleteProjectById(docId);
            setProjects(...projects);
            setSelectedProjects('INBOX');
        })();
    }

    return(
        <>            
            <span className="sidebar__project-name">{project.name}</span>
            <span
                className="sidebar__project-delete"
                data-testid="delete-project"
                onClick={() => setShowConfirm(!showConfirm)}
            >
                <FaTrashAlt />
                {showConfirm && (
                    <div className="project-delete-modal">
                        <div className="project-delete-modal__inner">
                            <p>Are you sure want to delete this project?</p>
                            <button 
                                type="button"
                                onClick={() => deleteProject(project.docId)}
                            >
                                Delete
                                <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
                            </button>
                        </div>
                    </div>
                )}
            </span>
        </>
    );
}