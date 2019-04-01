import { useState } from 'react';

function ProjectEditor(props) {
  const [name, setName] = useState(props.name);
  const [color, setColor] = useState(props.color);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleColorChange(event) {
    setColor(event.target.value);
  }
  
  return (
    <div>
      <section>
        <label htmlFor="name">Nom du projet</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
        <label htmlFor="color">Couleur</label>
        <input type="text" id="color" value={color} onChange={handleColorChange} />
        <button onClick={props.update.bind(this, name, color)}>Enregistrer</button>
      </section>
      <style jsx>{`
        div {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.2);
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
        }
      
        section {
          position: absolute;
          display: flex;
          flex-direction: column;
          width: 90%;
          margin: auto;
          padding: 2em;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);
        }
      
        label {
          font-size: 0.9em;
          font-weight: bold;
          width: 100%;
          padding-bottom: 0.8em;
        }
      
        input {
          margin-bottom: 1em;
        }
      
        button {
          cursor: pointer;
          margin-top: 1em;
          background-color: #0B1099;
          color: white;
          border: 1px solid #0B1099;
        }
        
        @media (min-width: 768px) {
          section {
            width: 320px;
          }
        }
      `}</style>
    </div>
  );
}

export default ProjectEditor;