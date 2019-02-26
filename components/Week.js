import React from 'react';
import getConfig from 'next/config';
import Hour from '../components/Hour';

const { publicRuntimeConfig } = getConfig()

class Week extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRangeStart: null,
      selectedRangeEnd: null,
    }
  }
  
  startSelection(hourId) {
    console.log('start selection', hourId);
  }
  
  endSelection(hourId) {
    console.log('stop selection', hourId);
  }
  
  handleMouseUp() {
    console.log('mouse uppppp');
  }
  
  render() {
    const { offset, assignProjectToHour, date, hours, weekId, getProject } = this.props;
    const weekOf = date.toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' });
    const hoursPerRow = Math.ceil(Math.sqrt(publicRuntimeConfig.hoursPerWeek)) + 1;
  
    return (
      <section>
        <h2>{ offset === 0 ? 'Cette semaine' : `Semaine du ${weekOf}`}</h2>
        <ul onMouseUp={this.handleMouseUp} onDragEnd={this.handleMouseUp}>
          { [...Array(publicRuntimeConfig.hoursPerWeek)].map((x, i) =>
            <li key={i}>
              <Hour
                startSelection={this.startSelection.bind(this)}
                endSelection={this.endSelection.bind(this)}
                weekId={weekId}
                hourId={i}
                projectId={hours ? hours[i] : undefined}
                getProject={getProject}
              />
            </li>
          ) }
        </ul>
        <style jsx>{`
          section {
            margin-bottom: 1.5em;
          }
          
          h2 {
            font-size: 1em;
          }
          
          ul {
            display: flex;
            flex-wrap: wrap;
          }

          li {
            width: ${100 / hoursPerRow}%;
          }
        `}</style>
      </section>
    );
  }
}

export default Week;
