import NewProjectButton from '../components/NewProjectButton';
import Project from '../components/Project';

function ProjectList({ projects, countHours, addProject, selectProject, selectedProject, editProject }) {
  return (
    <div onClick={selectProject.bind(this, null)}>
      <ul>
        { Object.keys(projects).map((id, i) => {
          const project = projects[id];

          return (
            <li key={i}>
              <Project
                id={project.id}
                count={countHours(project.id)}
                name={project.name}
                color={project.color}
                select={selectProject}
                selected={selectedProject === project.id}
                edit={editProject}
              />
            </li>
          );
        })}
        <li key="new"><NewProjectButton addProject={addProject.bind(this)}/></li>
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
          box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.1);
          z-index: 2;
        }
        
        ul {
          display: flex;
          flex-direction: column;
        }
        
        @media (min-width: 768px) {
          div {
            padding-right: 0;
            padding-bottom: 0;
          }

          ul {
            display: block;
          }
          
          li {
            float: left;
            margin-right: 1em;
          }
        }
      `}</style>
    </div>
  );
}

export default ProjectList;
