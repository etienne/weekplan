import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import ProjectList from '../components/ProjectList';
import ProjectEditor from '../components/ProjectEditor';
import Timeline from '../components/Timeline';

const { publicRuntimeConfig } = getConfig();

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: {},
      selectedProject: null,
      weeks: {},
      showArchived: false,
      showThisWeek: true,
    }
  }
  
  componentDidUpdate() {
    if (process.browser) {
      fetch(publicRuntimeConfig.serverEndpoint + '/store', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: { 'Content-Type': 'application/json' },
      }).catch(error => console.error('Error:', error));
    }
  }
  
  componentDidMount() {
    if (process.browser) {
      fetch(publicRuntimeConfig.serverEndpoint + '/store').then(res => res.json()).then(json => {
        this.setState(json);
      });
    }
  }
  
  getNextAvailableId() {
    const existingIds = Object.keys(this.state.projects);
    
    if (existingIds.length) {
      return Number(existingIds.sort((a, b) => b - a)[0]) + 1;
    }
    
    return 1;
  }
  
  getProject(id) {
    return this.state.projects[id];
  } 
  
  addProject(project) {
    const colors = publicRuntimeConfig.colors;
    project.id = this.getNextAvailableId();
    project.color = colors[((project.id - 1) % colors.length)];
    this.setState((state, props) => {
      const projects = state.projects;
      projects[project.id] = project;
      return {
        ...state,
        projects,
        selectedProject: project.id,
      };
    });
  }
  
  updateProject(name, color, note, archived) {
    this.setState((state, props) => {
      state.projects[this.state.editingProject].name = name;
      state.projects[this.state.editingProject].color = color;
      state.projects[this.state.editingProject].note = note;
      state.projects[this.state.editingProject].archived = archived;
      state.editingProject = null;
      return state;
    });
  }

  setShowArchived(show) {
    this.setState({ showArchived: show });
  }

  setShowThisWeek(show) {
    this.setState({ showThisWeek: show });
  }
  
  countHours(projectId) {
    const { weeks, showThisWeek } = this.state;
    let total = 0;
    const weekAgo = new Date();
    const offset = showThisWeek ? 7 : 0;
    weekAgo.setDate(weekAgo.getDate() - offset);

    for (const week in weeks) {
      if (weeks.hasOwnProperty(week) && week > weekAgo.valueOf()) {
        const hours = weeks[week];
        total += Object.values(hours).filter(v => v === projectId).length;
      }
    }
    
    return total;
  }
  
  selectProject(id, event) {
    this.setState({ selectedProject: id });
    event.stopPropagation();
  }
  
  editProject(id) {
    this.setState({ editingProject: id });
  }
  
  assignProjectToHour(weekId, hourId) {
    this.setState((state, props) => {
      const updatedWeeks = state.weeks;
      if (updatedWeeks[weekId]) {
        updatedWeeks[weekId][hourId] = this.state.selectedProject;
      } else {
        updatedWeeks[weekId] = { [hourId]: this.state.selectedProject };
      }
      return {
        ...state,
        weeks: updatedWeeks,
      }
    });
  }
  
  render() {
    const editedProject = this.state.editingProject && this.state.projects[this.state.editingProject];

    return (
      <div>
        <Head>
          <title>Wowé</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Timeline
          assignProjectToHour={this.assignProjectToHour.bind(this)}
          weeks={this.state.weeks}
          getProject={this.getProject.bind(this)}
          showThisWeek={this.state.showThisWeek}
        />
        <ProjectList
          countHours={this.countHours.bind(this)}
          projects={this.state.projects}
          addProject={this.addProject.bind(this)}
          selectProject={this.selectProject.bind(this)}
          selectedProject={this.state.selectedProject}
          editProject={this.editProject.bind(this)}
          showArchived={this.state.showArchived}
          setShowArchived={this.setShowArchived.bind(this, !this.state.showArchived)}
          showThisWeek={this.state.showThisWeek}
          setShowThisWeek={this.setShowThisWeek.bind(this, !this.state.showThisWeek)}
        />
        { editedProject && (
          <ProjectEditor name={editedProject.name} color={editedProject.color} note={editedProject.note} archived={editedProject.archived} update={this.updateProject.bind(this)} />
        ) }
        <style global jsx>{`
          * {
            box-sizing: border-box;
          }
        
          body {
            background: white;
            color: black;
            font-family: system-ui;
            margin: 0;
            padding: 0;
          }
          
          div {
            display: flex;
            flex-direction: column;
          }
          
          ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
          }
        
          h1, h2, h3, h4, h5, h6 {
            margin: 0 0 1em;
            padding: 0;
          }
        
          input[type=text], button {
            font-size: 1em;
            padding: 0.5em;
          }
          
          @media (min-width: 768px) {
            div {
              flex-direction: row;
            }
            
            .Timeline {
              order: 2;
            }
            
            .ProjectList {
              order: 1;
            }
          }
        `}</style>
      </div>
    );
  };
}

export default Index;