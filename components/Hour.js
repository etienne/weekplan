function Hour({ weekId, hourId, projectId, getProject, mouseEnter, mouseDown, mouseUp }) {
  const project = getProject(projectId);
  
  return (
    <div onMouseEnter={mouseEnter.bind(this, hourId)} onMouseUp={mouseUp} onMouseDown={mouseDown.bind(this, hourId)}>
      <style jsx>{`
        div {
          background-color: ${project ? project.color : '#eee'};
          margin-right: 1px;
          margin-bottom: 1px;
          height: 0;
          padding-bottom: 100%;
          cursor: pointer;
        }
        
        div:hover {
          background-color: ${project ? project.color : '#ddd'}
        }
      `}</style>
    </div>
  )
}

export default Hour;
