function Project({ id, name, color, selected, select }) {
  return (
    <div>
      <button className={selected ? 'selected' : undefined} onClick={select.bind(this, id)}>
        {name}
      </button>
      <style jsx>{`
        button {
          width: 100%;
          background: transparent;
          border: 1px solid #ddd;
          margin-bottom: 0.5em;
        }
        
        button::before {
          content: '!!',
          border: 1px solid blue;
        }
        
        button.selected {
          background-color: #ddd;
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