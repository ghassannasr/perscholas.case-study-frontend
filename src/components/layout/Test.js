import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

class Test extends React.Component {
  constructor(props) {
    super();
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
  }

  render() {
    return (
      <Editor 
        placeholder="This is a placeholder"
        editorState={this.state.editorState} 
        onChange={this.onChange} 
      />
    );
  }
}

//ReactDOM.render(<Test />, document.getElementById('container'));
export default Test;
