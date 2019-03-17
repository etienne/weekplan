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
    }
  }
  
  componentDidUpdate() {
    if (process.browser) {
      fetch(publicRuntimeConfig.serverEndpoint, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: { 'Content-Type': 'application/json' },
      }).catch(error => console.error('Error:', error));
    }
  }
  
  componentDidMount() {
    if (process.browser) {
      fetch(publicRuntimeConfig.serverEndpoint).then(res => res.json()).then(json => {
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
    project.color = colors[(project.id % colors.length) - 1];
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
  
  updateProject(name, color) {
    this.setState((state, props) => {
      state.projects[this.state.editingProject].name = name;
      state.projects[this.state.editingProject].color = color;
      state.editingProject = null;
      return state;
    });
  }
  
  countHours(projectId) {
    let total = 0;

    for (const week in this.state.weeks) {
      if (this.state.weeks.hasOwnProperty(week)) {
        const hours = this.state.weeks[week];
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
        />
        <ProjectList
          countHours={this.countHours.bind(this)}
          projects={this.state.projects}
          addProject={this.addProject.bind(this)}
          selectProject={this.selectProject.bind(this)}
          selectedProject={this.state.selectedProject}
          editProject={this.editProject.bind(this)}
        />
        { editedProject && (
          <ProjectEditor name={editedProject.name} color={editedProject.color} update={this.updateProject.bind(this)} />
        ) }
        <style global jsx>{`
          * {
            box-sizing: border-box;
          }
        
          body {
            background: white;
            color: black;
            font-family: system-ui;
            margin: 1em 0 1em 1em;
            padding: 0;
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
        
          input, button {
            font-size: 1em;
            padding: 0.5em;
          }
        `}</style>
      </div>
    );
  };
}

export default Index;