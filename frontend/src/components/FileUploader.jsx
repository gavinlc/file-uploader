import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledFileUploader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  input, select {
   margin-bottom: 20px;
  }
`;

const Error = styled.div`
    background: lightpink;
    border: 1px solid red;
    margin-bottom: 20px;
    padding: 10px;
`;

const TermsAgree = styled.div`
  background: lightgrey;
  border: 1px solid grey;
  margin-bottom: 20px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  padding: 10px;
  
  input {
    margin-bottom: 0;
    margin-right: 20px;
    width: 20px;
    height: 20px;
  }
  
`;

class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFile: '',
      fileName: '',
      termsAgree: false,
      option: '',
    };
  }

    handleOnChange = (e) => {
      const { name } = e.target;
      let value;

      if (name === 'termsAgree') value = e.target.checked;
      else if (name === 'uploadFile') value = e.target.files[0];
      else value = e.target.value;

      console.log('handleOnChange: name: ', name);
      console.log('handleOnChange: value: ', value);

      const newState = {};
      newState[name] = value;

      this.setState(newState);
    };

    handleSubmit = () => {
      const { uploadFile, fileName } = this.state;
      const formData = new FormData();
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      formData.append('file', uploadFile, fileName);
      formData.append('data', JSON.stringify(this.state));
      axios.post('http://localhost:8000/upload', formData, config).then((e) => console.log('upload done: ', e));
    };

    validator = () => {
      const {
        uploadFile, fileName, termsAgree, option,
      } = this.state;
      const fileSizeOK = this.checkFileSizeOK();
      return (uploadFile === '' || fileName === '' || !termsAgree || option === '' || !fileSizeOK);
    };

    checkFileSizeOK = () => {
      const { uploadFile } = this.state;
      let checkFileSizeOK = true;
      if (uploadFile) {
        checkFileSizeOK = uploadFile.size < 5000000;
      }
      return checkFileSizeOK;
    };

    render() {
      const {
        uploadFile, fileName, termsAgree, option,
      } = this.state;

      console.log('render: validator result: ', this.validator());

      return (
        <StyledFileUploader>
          <input type="file" name="uploadFile" onChange={this.handleOnChange} />
          {(uploadFile !== '' && !this.checkFileSizeOK())
                    && <Error>File too big, maximum is 5MB</Error>}
          <input type="text" name="fileName" value={fileName} onChange={this.handleOnChange} placeholder="Enter a filename" />
          <select name="option" onChange={this.handleOnChange} value={option}>
            <option value="">Please select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <TermsAgree>
            <input type="checkbox" id="termsAgree" value={termsAgree} name="termsAgree" onChange={this.handleOnChange} />
            <label htmlFor="termsAgree">I agree to the Terms & Conditions</label>
          </TermsAgree>
          <input type="submit" onClick={this.handleSubmit} disabled={this.validator()} />
        </StyledFileUploader>
      );
    }
}

export default FileUploader;
