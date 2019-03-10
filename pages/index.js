import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import ProjectList from '../components/ProjectList';
import Timeline from '../components/Timeline';

const { publicRuntimeConfig } = getConfig()

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: {},
      selectedProject: null,
      weeks: {},
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
  
  assignProjectToHour(weekId, hourId) {
    if (!this.state.selectedProject) {
      console.error('Could not assign project to hour because there is no selected project');
      return;
    }
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
        />
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