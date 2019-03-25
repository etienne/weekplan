import { isLight } from '../helpers/utils';

function Hour({ weekId, hourId, projectId, getProject, mouseEnter, mouseDown, mouseUp, showLabel, count }) {
  const project = getProject(projectId);
  
  return (
    <div onMouseEnter={mouseEnter.bind(this, hourId)} onMouseUp={mouseUp} onMouseDown={mouseDown.bind(this, hourId)}>
      { showLabel && (
        <span className="label">
          {project.name}
          {count && <span className="count">{count}</span>}
        </span>
      ) }
      <style jsx>{`
        div {
          position: relative;
          background-color: ${project ? project.color : '#eee'};
          margin-right: 1px;
          margin-bottom: 1px;
          height: 0;
          padding-bottom: 100%;
          cursor: pointer;
        }
        
        span.label {
          position: absolute;
          width: max-content;
          z-index: 1;
          top: 0.4em;
          left: 0.4em;
          font-size: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          padding: 0.2em 0.4em;
          background-color: ${project ? project.color : 'transparent'};
          color: ${project && !isLight(project.color) ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
          box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.15);
        }
        
        span.count {
          padding-left: 0.6em;
          color: ${project && !isLight(project.color) ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'};
        }
        
        div:hover {
          background-color: ${project ? project.color : '#ddd'}
        }
      `}</style>
    </div>
  )
}

export default Hour;
