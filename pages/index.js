import React from 'react';
import Head from 'next/head';
import ProjectList from '../components/ProjectList';
import Timeline from '../components/Timeline';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      selectedProject: null,
      weeks: {},
    }
  }
  
  getNextAvailableId() {
    console.warn('Assigned fake id 4');
    return 4;
  }
  
  getProject(id) {
    return this.state.projects.find(project => project.id === id);
  } 
  
  addProject(project) {
    project.id = this.getNextAvailableId();
    project.color = 'red';
    console.warn('Assigned fake color red');
    this.setState((state, props) => {
      const projects = state.projects;
      projects.push(project);
      return {
        projects,
        ...state,
      };
    });
  }
  
  selectProject(id) {
    this.setState({ selectedProject: id });
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
            margin: 1em;
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