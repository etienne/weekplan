import Toggle from './Toggle';
import NewProjectButton from './NewProjectButton';
import Project from './Project';

function ProjectList({
  projects,
  countHours,
  addProject,
  selectProject,
  selectedProject,
  editProject,
  showArchived,
  setShowArchived,
  showThisWeek,
  setShowThisWeek,
}) {
  return (
    <div className="ProjectList" onClick={selectProject.bind(this, null)}>
      <ul>
        { Object.keys(projects).map((id, i) => {
          const project = projects[id];

          if (!showArchived && project.archived) {
            return;
          }

          return (
            <li key={i}>
              <Project
                id={project.id}
                count={countHours(project.id)}
                name={project.name}
                color={project.color}
                note={project.note}
                archived={project.archived}
                select={selectProject}
                selected={selectedProject === project.id}
                edit={editProject}
              />
            </li>
          );
        })}
        <li key="new"><NewProjectButton addProject={addProject.bind(this)}/></li>
        <li key="thisWeekToggle">
          <Toggle
            id="showThisWeek"
            label={'Afficher cette semaine'}
            value={showThisWeek}
            onChange={setShowThisWeek}
          />
        </li>
        <li key="archivedToggle">
          <Toggle
            id="showArchived"
            label={'Afficher les projets archivés'}
            value={showArchived}
            onChange={setShowArchived}
          />
        </li>
      </ul>
      <style jsx>{`
        div {
          padding: 1em;
          width: 100%;
        }
        
        ul {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        
        @media (min-width: 768px) {
          div {
            max-width: 300px;
          }
        }
        
      `}</style>
    </div>
  );
}

export default ProjectList;
