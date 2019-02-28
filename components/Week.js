import React from 'react';
import getConfig from 'next/config';
import Hour from '../components/Hour';

const { publicRuntimeConfig } = getConfig()

class Week extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPainting: false,
    }
  }
  
  mouseEnterHour(hourId) {
    if (this.state.isPainting) {
      this.props.assignProjectToHour(this.props.weekId, hourId);
    }
  }
  
  mouseDownHour(hourId) {
    this.setState({ isPainting: true });
    this.props.assignProjectToHour(this.props.weekId, hourId);
  }
  
  mouseUpHour(hourId) {
    this.setState({ isPainting: false });
  }
  
  render() {
    const { offset, date, hours, weekId, getProject } = this.props;
    const weekOf = date.toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' });
    const hoursPerRow = Math.ceil(Math.sqrt(publicRuntimeConfig.hoursPerWeek)) + 1;
  
    return (
      <section>
        <h2>{ offset === 0 ? 'Cette semaine' : `Semaine du ${weekOf}`}</h2>
        <ul>
          { [...Array(publicRuntimeConfig.hoursPerWeek)].map((x, i) =>
            <li key={i}>
              <Hour
                mouseDown={this.mouseDownHour.bind(this)}
                mouseEnter={this.mouseEnterHour.bind(this)}
                mouseUp={this.mouseUpHour.bind(this)}
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
