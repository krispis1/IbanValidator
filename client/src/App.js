import React, {
  Component
} from "react";
import axios from 'axios';
import './App.css';

const toInputUppercase = e => {
  e.target.value = ("" + e.target.value).toUpperCase();
};

const regex = new RegExp('[A-Z]{2}[0-9]{18}');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationResponse: "",
      inputValue: "",
      inputValidatorId: "",
      selectedFile: null,
      selectedFileName: "",
      fileTypeWarning: ""
    };
  }

  validateHandler = () => {
    if (regex.test(this.state.inputValue) && this.state.inputValue.length === 20) {
      axios.get("http://localhost:9000?iban=" + this.state.inputValue)
        .then((res) => {
          var validationRes = res.data.split(';');
          if (validationRes[1] === "Valid") {
            this.setState({
              inputValidatorId: "",
              validationResponse: validationRes[1] + '. ' + validationRes[2]
            });
          } else {
            this.setState({
              inputValidatorId: "",
              validationResponse: validationRes[1]
            });
          }
        });
    } else {
      this.setState({
        validationResponse: "Wrong format",
        inputValidatorId: "wrongFormat"
      });
    }
  }

  uploadAndValidateHandler = () => {
    if (!this.state.selectedFile || this.state.selectedFile.type !== "text/plain") {
      this.setState({
        fileTypeWarning: "Please select a .txt file"
      });
    } else {
      const data = new FormData();
      data.append('file', this.state.selectedFile);
      axios.post("http://localhost:9001", data, {})
        .then(res => { // then print response status
          console.log(res.statusText);
          window.open('http://localhost:9001/iban_valid');
          window.open('http://localhost:9001/iban_bank');
        });
    }
  }

  onChangeHandler = event => {
    this.setState({
      fileTypeWarning: "",
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name,
      loaded: 0
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>IBAN VALIDATOR</h1>
        <div className="form__group field">
          <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onInput={toInputUppercase} type="input" className={"form__field " + this.state.inputValidatorId} placeholder="IBAN" name="IBAN" id='IBAN'/>
          <label htmlFor="IBAN" className="form__label">IBAN</label>
          <button className="button" onClick={this.validateHandler}><span>Validate </span></button>
          <p>{this.state.validationResponse}</p>
          <h2>OR</h2>
          <div className="upload-btn-wrapper">
            <button className="btn">Select .txt file</button>
            <input type="file" accept="text/plain" name="myfile" onChange={this.onChangeHandler}/>
          </div>
          <p>{this.state.selectedFileName}</p>
          <br></br>
          <button className="button" onClick={this.uploadAndValidateHandler}><span>Upload and validate </span></button>
          <p id="warning">{this.state.fileTypeWarning}</p>
        </div>
        </header>
      </div>
    );
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
}

export default App;