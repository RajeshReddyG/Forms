import React from 'react';
import axios from 'axios';
import RenderForm from "./RenderForm"

class ViewSavedForms extends React.Component {
    constructor() {
        super();
        this.state = {
            forms: [],
            formNames: [],
            formIndex: [],
            renderFormData: ""
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3300/forms", {}).then((res) => {
            //on success
            this.setState({
                forms: res.data
            });
        }).catch((error) => {
            //on error
            alert("There is an error in API call.");
        });
    }

    viewAllForms = (e) => {
        var formIndex = {};
        var { forms } = this.state
        var formNames = [];
        for (var i = 0; i < forms.length; i++) {
            var formObj = forms[i];
            var NameKey = Object.keys(formObj);
            var formName = NameKey[0];
            formNames.push(formName);
            var form = formObj[formName];
            formIndex[formName] = form;
        }
        this.setState({
            formNames, formIndex
        });
    }
    renderForm = (e) => {
        this.setState(
            {
                renderFormData: <RenderForm formData={this.state.formIndex[e.target.value]} />
            }
        )
    }

    render() {


        return (
            <div>
                <button className="btn btn-outline-dark" onClick={this.viewAllForms}>View all forms</button>
                <div className="row h-100 w-100">
                    <div className="container jumbotron col-1 col">
                        <p>Your Forms</p>
                        {
                            this.state.formNames.map((val, idx) => {
                                return (
                                    <div>
                                        <button className="btn btn-light btn-block" value={val} onClick={this.renderForm}>{val}</button>
                                        <br />
                                    </div>

                                )
                            })
                        }
                    </div>
                    <div className="container jumbotron col-10">
                        {this.state.renderFormData}
                    </div>
                </div>
            </div >
        );
    }
}

export default ViewSavedForms;