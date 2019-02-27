function Hour({ assignProjectToHour, weekId, hourId, projectId, getProject }) {
  const project = getProject(projectId);

  return (
    <div onClick={assignProjectToHour.bind(this, weekId, hourId)}>
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
