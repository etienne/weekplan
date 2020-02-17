import { isLight } from '../helpers/utils';

function Project({ id, count, name, color, note, selected, select, edit }) {
  return (
      <button className={selected ? 'project selected' : 'project'} onClick={select.bind(this, id)} onDoubleClick={edit.bind(this, id)}>
        <div className="main">
          {name}
          {count > 0 && <span className="count">{count}</span>}
        </div>
        { note &&
          <div className="note">{note}</div>
        }
        <style jsx>{`
          button {
            width: 100%;
            border: 0;
            border-radius: 0.2em;
            border-top: 1px solid #eee;
            background: transparent;
            text-align: left;
            cursor: pointer;
            font-weight: bold;
            line-height: 1.4;
            position: relative;
            padding-left: 2.1em;
            font-size: 0.9em;
          }
          
          button:hover {
            background-color: #eee;
          }
          
          button::before {
            position: absolute;
            content: '';
            width: 0.8em;
            height: 0.8em;
            top: 0.75em;
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
            position: absolute;
            right: 0.8em;
            margin-top: 3px;
            padding-left: 1em;
            font-size: 0.8em;
            color: rgba(0, 0, 0, 0.4);
            font-weight: normal;
          }

          div.main {
            width: 100%;
          }

          div.note {
            font-weight: normal;
            color: rgba(0, 0, 0, 0.4);
          }

          button.selected div.note {
            color: rgba(${isLight(color) ? '0, 0, 0' : '255, 255, 255'}, 0.5);
          }
          
          button.selected span.count {
            color: rgba(${isLight(color) ? '0, 0, 0' : '255, 255, 255'}, 0.5);
          }
      `}</style>
    </button>
  );
}

export default Project;