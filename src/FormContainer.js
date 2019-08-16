import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ViewSavedForms from './ViewSavedForms';

class FormContainer extends React.Component {
    state = {
        fields: [],
        fieldlabel: "",
        fieldType: "",
        fieldvalue: "",
        // fieldCounter: -1,
        formName: ""
    }

    addField = (e) => {
        this.setState({ fieldCounter: (this.state.fieldCounter + 1) });
        console.log(this.state.fieldCounter);
        this.setState((prevState) => ({
            fields: [...prevState.fields, { fieldType: this.state.fieldType, fieldlabel: this.state.fieldlabel, fieldvalue: this.state.fieldvalue }],
        }));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.fields);
        axios.post("http://localhost:3300/forms",
            {
                [this.state.formName]: this.state.fields,

            }).then((res) => {
                alert("Submission Sucessful\nClick Ok to View the Forms");
                ReactDOM.render(<ViewSavedForms />, document.getElementById('root'));
            }).catch((error) => {
                //on error
                alert("Submission Unsucessful\nThere is an error in API call");
            });

    }

    render() {
        let { fields, fieldlabel, fieldvalue, formName } = this.state
        return (
            <div className="row h-100 w-100">
                <div className="col-4">
                    <div className="container">
                        <div className="jumbotron">
                            <input className="form-control" type="text" name="fieldlabel" id="fieldlabel"
                                value={fieldlabel} placeholder="Label" onChange={this.handleChange} />
                            <select className="form-control" name="fieldType" onChange={this.handleChange}>
                                <option />
                                <option value="text">text</option>
                                <option value="email">email</option>
                                <option value="password">password</option>
                                <option value="date">date</option>
                                <option value="number">number</option>
                                <option value="button">button</option>
                                {/* <option value="checkbox">checkbox</option> */}
                                {/* <option value="color">color</option> */}
                                {/* <option value="file">file</option> */}
                                {/* <option value="radio">radio</option> */}
                                {/* <option value="range">range</option> */}
                            </select>
                            <input className="form-control" type="text" name="fieldvalue" id="fieldvalue" value={fieldvalue} placeholder="Value" onChange={this.handleChange} />
                            <button className="btn btn-success" onClick={this.addField}>Add Field</button>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                        <div className="jumbotron">
                            {
                                fields.map((val, idx) => {
                                    let fieldID = `field-${idx}`
                                    return (
                                        <div key={idx}>
                                            {(fields[idx].fieldType === "button") ? <br /> : <label htmlFor={fieldID}>{`${fields[idx].fieldlabel}: `}</label>}
                                            &emsp;
                                        <input
                                                type={fields[idx].fieldType}
                                                name={fieldID}
                                                data-id={idx}
                                                id={fieldID}
                                                value={fields[idx].fieldvalue}
                                                className="form-control"
                                            // disabled
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <input className="form-control" type="text" name="formName" id="formName" value={formName} placeholder="FormName" onChange={this.handleChange} />
                                </div>
                                <div className="col-1">
                                    <input className="btn btn-success" type="submit" value="Submit" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default FormContainer;