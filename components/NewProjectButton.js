import React from 'react';

class NewProjectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
    this.inputRef = React.createRef();
  }
  
  toggleEditMode() {
    this.setState((state, props) => {
      return { editMode: !state.editMode };
    });
  }
  
  componentDidUpdate() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }
  
  submit(event) {
    event.preventDefault();
    if (this.inputRef) {
      this.toggleEditMode();
      this.props.addProject({ name: this.inputRef.current.value });
    } else {
      console.error('Could not add project');
    }
  }
  
  render() {
    return (
      <div>
        { this.state.editMode
          ? (
              <form onSubmit={this.submit.bind(this)}>
                <input type="text" placeholder="Nom du projet" ref={this.inputRef} />
              </form>
            )
          : (
              <button className="new" onClick={this.toggleEditMode.bind(this)}>
                Nouveau projet
              </button> 
            )
        }
        <style jsx>{`
          button.new {
            display: block;
            width: 100%;
            background-color: #0179FF;
            color: white;
            cursor: pointer;
          }
    
          button.new::before {
            content: '+';
            position: relative;
            left: -0.25em;
            top: 0.05em;
            font-size: 1.5em;
            line-height: 0;
            color: rgba(255, 255, 255, 0.5);
          }
          
          button.new:hover {
            background-color: #016BE2;
          }
          
          input {
            border: 1px solid #ccc;
            width: 100%;
          }
          
          @media (min-width: 768px) {
            button, input {
              margin-bottom: 1em;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default NewProjectButton;
