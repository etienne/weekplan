import NewProjectButton from '../components/NewProjectButton';
import Project from '../components/Project';

function ProjectList({ projects, addProject, selectProject, selectedProject }) {
  return (
    <div>
      <ul>
        { projects.map((project, i) => {
          return (
            <li key={i}>
              <Project
                id={project.id}
                name={project.name}
                color={project.color}
                select={selectProject}
                selected={selectedProject === project.id}
              />
            </li>
          );
        })}
        <li><NewProjectButton addProject={addProject.bind(this)}/></li>
      </ul>
      <style jsx>{`
        div {
          position: fixed;
          left: 0px;
          bottom: 0px;
          padding: 1em;
          width: 100%;
          border-top: 1px solid #ccc;
          background-color: white;
        }
      `}</style>
    </div>
  );
}

export default ProjectList;
