function Project({ id, name, color, selected, select }) {
  // https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black#12043228
  const c = color.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const isLight = luma > 40 ? true : false;  
  
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
          top: 0.6em;
          left: 0.6em;
          border: 1px solid white;
          border-radius: 0.2em;
          background-color: ${color};
          position: absolute;
        }
        
        button.selected {
          background-color: ${color};
          color: ${isLight ? 'black' : 'white'};
        }
        
        button.selected::before {
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