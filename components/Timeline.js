import getConfig from 'next/config';
import Week from '../components/Week';

const { publicRuntimeConfig } = getConfig()

function Timeline({ assignProjectToHour, weeks, getProject }) {
  return (
    <ul className="Timeline">
      { [...Array(publicRuntimeConfig.visibleWeeks)].map((x, i) => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - (date.getDay() || 7) + 1 + (i * 7));
        const weekId = date.valueOf();
        
        return (
          <li key={i}>
            <Week
              date={date}
              weekId={weekId}
              hours={weeks[weekId]}
              assignProjectToHour={assignProjectToHour}
              getProject={getProject}
              offset={i}
            />
          </li>
        );
      }
      ) }
      <style jsx>{`
        ul {
          display: flex;
          flex-direction: column;
          padding: 1em;
        }
        
        @media (min-width: 768px) {
          ul {
            display: block;
          }
          
          li {
            float: left;
            width: calc(50% - 1em);
            margin-right: 1em;
          }
        }
        
        @media (min-width: 1024px) {
          li {
            width: calc(33.33% - 1em);
          }
        }
      `}</style>
    </ul>
  )
}

export default Timeline;
