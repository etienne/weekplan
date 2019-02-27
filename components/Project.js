function Project({ id, name, color, selected, select }) {
  return (
    <div>
      <button className={selected ? 'selected' : undefined} onClick={select.bind(this, id)}>
        {name}
      </button>
      <style jsx>{`
        button {
          width: 100%;
          position: relative;
          background: transparent;
          border: 1px solid #ddd;
          margin-bottom: 0.5em;
          text-align: left;
          padding-left: 1.9em;
        }
        
        button:hover {
          background-color: #eee;
        }
        
        button::before {
          content: '';
          width: 0.8em;
          height: 0.8em;
          top: 0.7em;
          left: 0.6em;
          border-radius: 0.2em;
          background-color: ${color};
          position: absolute;
        }
        
        button.selected {
          background-color: #ccc;
        }
        
        @media (min-width: 768px) {
          button {
            margin-bottom: 1em;
          }
        }
      `}</style>
    </div>
  );
}

export default Project;