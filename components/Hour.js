function Hour({ startSelection, endSelection, weekId, hourId, projectId, getProject }) {
  const project = getProject(projectId);

  return (
    <div onDragStart={startSelection.bind(this, hourId)} onDragEnd={endSelection.bind(this, hourId)} >
      <style jsx>{`
        div {
          background-color: ${project ? project.color : '#ddd'};
          margin-right: 1px;
          margin-bottom: 1px;
          height: 0;
          padding-bottom: 100%;
        }
      `}</style>
    </div>
  )
}

export default Hour;
