import { useState } from 'react';

export default function ArchivedProjectsToggle({ showArchived, setShowArchived }) {
  function handleToggle() {
    setShowArchived(!showArchived);
  }

  return (
    <>
      <input id="archivedToggle" type="checkbox" checked={showArchived} onChange={handleToggle}/>
      <label htmlFor="archivedToggle">Afficher les projets archivés</label>
      <style jsx>{`
        input {
          margin-right: 0.7em;
        }

        label {
          font-size: 0.8em;
          color: #999;
        }
      `}</style>
    </>
  );
}
