import { isLight } from '../helpers/utils';

function Project({ id, count, name, color, selected, select }) {
  return (
    <div>
      <button className={selected ? 'selected' : undefined} onClick={select.bind(this, id)}>
        {name}
        {count > 0 && <span className="count">{count}</span>}
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
          cursor: pointer;
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
          color: ${isLight(color) ? 'black' : 'white'};
        }
        
        span.count {
          float: right;
          font-size: 0.8em;
          color: rgba(0, 0, 0, 0.4);
        }
        
        button.selected span.count {
          color: rgba(${isLight(color) ? '0, 0, 0' : '255, 255, 255'}, 0.5);
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