import React from 'react';
import styled from 'styled-components';
import axios from 'axios';


const StyledFileUploader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

class FileUploader extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            uploadFile: "",
            fileName: "",
            termsAgree: false,
            option: "",
        };
    }

    handleOnChange = (e) => {
        const { name } = e.target;
        let value;

        if (name === "termsAgree") value = e.target.checked;
        else if (name === "uploadFile") value = e.target.files[0];
        else value = e.target.value;

        console.log("handleOnChange: name: ", name);
        console.log("handleOnChange: value: ", value);

        const newState = {};
        newState[name] = value;

        this.setState(newState);

    };

    handleSubmit = () => {

        const formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        formData.append("file", this.state.uploadFile, this.state.fileName);
        formData.append("data", JSON.stringify(this.state));
        axios.post("http://localhost:8000/upload", formData, config).then((e)=> console.log("upload done: ", e));
    };

    render() {

        const { uploadFile, fileName, termsAgree, option } = this.state;

        return(
            <StyledFileUploader>
                <input type="file" name="uploadFile" onChange={this.handleOnChange} />
                <input type="text" name="fileName" value={fileName} onChange={this.handleOnChange} placeholder="Enter a filename" />
                <select name="option" onChange={this.handleOnChange} value={option}>
                    <option value="">Please select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <input type="checkbox" value={termsAgree} name="termsAgree" onChange={this.handleOnChange} />
                <label htmlFor="termsAgree">I agree to the Terms & Conditions</label>
                <input type="submit" onClick={this.handleSubmit} disabled={!termsAgree} />
            </StyledFileUploader>
        )
    }

}

export default FileUploader;