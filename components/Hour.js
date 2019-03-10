import { isLight } from '../helpers/utils';

function Hour({ weekId, hourId, projectId, getProject, mouseEnter, mouseDown, mouseUp, showLabel }) {
  const project = getProject(projectId);
  
  return (
    <div onMouseEnter={mouseEnter.bind(this, hourId)} onMouseUp={mouseUp} onMouseDown={mouseDown.bind(this, hourId)}>
      { showLabel && <span>{project.name}</span> }
      <style jsx>{`
        div {
          background-color: ${project ? project.color : '#eee'};
          margin-right: 1px;
          margin-bottom: 1px;
          height: 0;
          padding-bottom: 100%;
          cursor: pointer;
          position: relative;
        }
        
        span {
          position: absolute;
          top: 5px;
          right: 7px;
          bottom: 5px;
          left: 7px;
          font-size: 10px;
          color: ${project && !isLight(project.color) ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'};
        }
        
        div:hover {
          background-color: ${project ? project.color : '#ddd'}
        }
      `}</style>
    </div>
  )
}

export default Hour;
