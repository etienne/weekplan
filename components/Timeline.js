import getConfig from 'next/config';
import Week from '../components/Week';

const { publicRuntimeConfig } = getConfig()

function Timeline({ assignProjectToHour, weeks, getProject }) {
  return (
    <ul>
      { [...Array(publicRuntimeConfig.visibleWeeks)].map((x, i) => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - date.getDay() + 1 + (i * 7));
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
        }
        
        @media (min-width: 768px) {
          ul {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          
          li {
            width: calc(33.33% - 0.666em);
          }
        }
      `}</style>
    </ul>
  )
}

export default Timeline;
