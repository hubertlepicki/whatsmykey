import "./index.scss"
import ReactDOM from "react-dom";
import React from "react";

const reactRoot = document.createElement("div");
reactRoot.setAttribute("id", "react-root");
document.body.appendChild(reactRoot);

const App = (props) => <WhatsMyKey />

class WhatsMyKey extends React.Component {
  constructor() {
    super();
    this.state = {
      keys: [],
      username: null
    };
  }

  onKeyPress(event) {
    if (event.key == "Enter") {
      console.debug(`fetching list of keys for user... ${this.refs.username.value}`);
      this.setState({username: this.refs.username.value});

      fetch(`https://api.github.com/users/${this.refs.username.value}/keys`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
    }
  }

  render() {
    return(
      <div>
        <input type="text" ref="username" placeholder="Enter Github username..." onKeyPress={this.onKeyPress.bind(this)} />

        { this.state.username ? <h2>List of keys for Github user: {this.state.username}</h2> : null }
      </div>
    );
  }

};

ReactDOM.render(<App />, reactRoot);
