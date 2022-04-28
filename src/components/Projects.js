import React, {useState} from "react";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { IndividualProject } from "./IndividualProject";

export const Projects = ({activeValue = null}) => {
    const [active, setActive] = useState(activeValue);
    const {setSelectedProject} = useSelectedProjectValue();
    const {projects} = useProjectsValue();

    return(
        projects &&
        projects.map(project => (
            <li
                key={project.projectid}
                data-doc-id={project.docid}
                data-testid='project-action'
                className={
                    active === project.projectid
                        ? 'active sidebar__project'
                        : 'sidebar_project'
                }
                onClick={() => {
                    setActive(project.projectid);
                    setSelectedProject(project.projectid);
                }}
            >
                <IndividualProject project = { project } />
            </li>
        ))
    );
}