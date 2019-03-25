import { isLight } from '../helpers/utils';

function Project({ id, count, name, color, selected, select, edit }) {
  return (
    <div>
      <button className={selected ? 'project selected' : 'project'} onClick={select.bind(this, id)}>
        {name}
        {count > 0 && <span className="count">{count}</span>}
      </button>
      <button className="edit" onClick={edit.bind(this, id)}><img src="/static/edit.svg" /></button>
      <style jsx>{`
        div {
          width: 100%;
          display: flex;
        }
        
        button {
          border: 1px solid #ddd;
          background: transparent;
          margin-bottom: 0.5em;
          text-align: left;
          cursor: pointer;
        }
        
        button.project {
          position: relative;
          padding-left: 1.9em;
        }
        
        button:hover {
          background-color: #eee;
        }
        
        button.edit {
          width: 2.5em;
          border-left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        button.project::before {
          position: absolute;
          content: '';
          width: 0.8em;
          height: 0.8em;
          top: 0.6em;
          left: 0.6em;
          border: 1px solid white;
          border-radius: 0.2em;
          background-color: ${color};
        }
        
        button.selected {
          background-color: ${color};
          color: ${isLight(color) ? 'black' : 'white'};
        }
        
        span.count {
          float: right;
          margin-top: 3px;
          padding-left: 1em;
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