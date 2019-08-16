import React from 'react';
import ReactDOM from 'react-dom';
import FormContainer from './FormContainer';
import ViewSavedForms from './ViewSavedForms';
import { GoogleLogout } from 'react-google-login';
import Home from './Home';
import "./Main.css"
// import ReactDOM from 'rea ct-dom';

class Main extends React.Component {
    createForm() {
        ReactDOM.render(<FormContainer />, document.getElementById('root'));
    }
    viewForms() {
        ReactDOM.render(<ViewSavedForms />, document.getElementById('root'));
    }
    logout(response) {
        //ToDo: Use Response to Validate Logout
        ReactDOM.render(<Home />, document.getElementById('root'));
        this.props.logOutCallback();
    }
    render() {
        return (
            <div className="text-white float-right">
                Hello {this.props.gapiResponse.name}
                <img src={this.props.gapiResponse.picture} alt="Profile Img" width="30" height="30  " />
                <GoogleLogout
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText={<i className="fa fa-google text-white">&nbsp;Logout</i>}
                    icon={false}
                    theme="dark"
                    // buttonText="Logout"
                    onLogoutSuccess={this.logout.bind(this)}
                />
                <br />
                <button className="btn btn-light" onClick={this.createForm}>CreateForm</button>&nbsp;
                <button className="btn btn-light" onClick={this.viewForms}>ViewForms</button>
            </div>
        );
    }
}

export default Main;