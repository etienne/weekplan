class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      color: props.color,
    };
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleColorChange(event) {
    this.setState({ color: event.target.value });
  }
  
  render() {
    return (
      <div>
        <section>
          <label htmlFor="name">Nom du projet</label>
          <input type="text" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
          <label htmlFor="color">Couleur</label>
          <input type="text" id="color" value={this.state.color} onChange={this.handleColorChange.bind(this)} />
          <button onClick={this.props.update.bind(this, this.state.name, this.state.color)}>Enregistrer</button>
        </section>
        <style jsx>{`
          div {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.2);
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
          }
        
          section {
            position: absolute;
            display: flex;
            flex-direction: column;
            width: 90%;
            margin: auto;
            padding: 2em;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);
          }
        
          label {
            font-size: 0.9em;
            font-weight: bold;
            width: 100%;
            padding-bottom: 0.8em;
          }
        
          input {
            margin-bottom: 1em;
          }
        
          button {
            cursor: pointer;
            margin-top: 1em;
            background-color: #0B1099;
            color: white;
            border: 1px solid #0B1099;
          }
          
          @media (min-width: 768px) {
            section {
              width: 320px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default ProjectEditor;