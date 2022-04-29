import React, {useState} from "react";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { IndividualProject } from "./IndividualProject";

export const Projects = ({ activeValue = null }) => {
    const [active, setActive] = useState(activeValue);
    const { setSelectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
  
    if (!projects) {
      return (<p>No projects yet</p>);
    }

    if (!Array.isArray(projects)) {
      const project = projects;
      return (
        <li
        key={project.projectid}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
      );
    }
    console.log(projects);
    console.log(projects.length);

    return (
      projects &&
      projects.map((project) => (
        <li
          key={project.projectid}
          data-testid="project-action-parent"
          data-doc-id={project.docId}
          className={
            active === project.projectId
              ? 'active sidebar__project'
              : 'sidebar__project'
          }
        >
          <div
            role="button"
            data-testid="project-action"
            tabIndex={0}
            aria-label={`Select ${project.name} as the task project`}
            onClick={() => {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActive(project.projectId);
                setSelectedProject(project.projectId);
              }
            }}
          >
            <IndividualProject project={project} />
          </div>
        </li>
      ))
    );
};