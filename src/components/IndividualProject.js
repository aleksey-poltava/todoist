import React, {useState} from "react";
import PropTypes from 'prop-types';
import {FaTrashAlt} from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { deleteProjectById } from "../services/firestore";

export const IndividualProject = ({project}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const {projects, setProjects} = useProjectsValue();
    const {selectedProject, setSelectedProjects} = useSelectedProjectValue();

    const deleteProject = docId => {
        (async () => {
            console.log(typeof setProjects);
            console.log(typeof setSelectedProjects);
            await deleteProjectById(docId);
            setProjects(...projects);
            //setSelectedProjects('INBOX');
        })();
    }

    return (
        <>
          <span className="sidebar__dot">•</span>
          <span className="sidebar__project-name">{project.name}</span>
          <span
            className="sidebar__project-delete"
            data-testid="delete-project"
            onClick={() => setShowConfirm(!showConfirm)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowConfirm(!showConfirm);
            }}
            tabIndex={0}
            role="button"
            aria-label="Confirm deletion of project"
          >
            <FaTrashAlt />
            {showConfirm && (
              <div className="project-delete-modal">
                <div className="project-delete-modal__inner">
                  <p>Confirm?</p>
                  <button
                    type="button"
                    onClick={() => deleteProject(project.docId)}
                  >
                    Delete
                  </button>
                  <span
                    onClick={() => setShowConfirm(!showConfirm)}                    
                    tabIndex={0}
                    role="button"                    
                  >
                    Cancel
                  </span>
                </div>
              </div>
            )}
          </span>
        </>
      );
    };
    
IndividualProject.propTypes = {
      project: PropTypes.object.isRequired,
};