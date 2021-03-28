import getConfig from 'next/config';
import Week from './Week';

const { publicRuntimeConfig } = getConfig()

function Timeline({ assignProjectToHour, weeks, getProject, showThisWeek }) {
  return (
    <ul className="Timeline">
      { [...Array(publicRuntimeConfig.visibleWeeks)].map((x, i) => {
        const date = new Date();
        const offset = showThisWeek ? 0 : 7;
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - (date.getDay() || 7) + offset + 1 + (i * 7));
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
              showThisWeek={showThisWeek}
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

        @media (min-width: 1600px) {
          li {
            width: calc(25% - 1em);
          }
        }

      `}</style>
    </ul>
  )
}

export default Timeline;
