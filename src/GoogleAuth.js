import React from 'react';
// import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';
import Main from './Main';
import axios from 'axios';
// // or
// import { GoogleLogin } from 'react-google-login';

class GoogleAuth extends React.Component {
    constructor() {
        super();
        this.state = {
            apiResponse: [],
            isLoggedIn: false
        }
        this.Authenticate = this.Authenticate.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    Authenticate(response) {
        var tokenCheckUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + response.tokenId;
        axios.get(tokenCheckUrl).then((res) => {
            if (res.data.email_verified === "true") {
                this.setState({
                    apiResponse: res.data,
                    isLoggedIn: true
                });
                console.log(this.state.apiResponse);
                //ReactDOM.render(<Main gapiResponse={this.state.apiResponse} />, document.getElementById('root'));
            }
            else {
                alert("Login Unsuccesfull")
            }
        }).catch((error) => {
            //on error
            alert("There is an error in API call.\n Login Unsuccesfull");
        });
    }
    logOut() {
        alert("LoggedOut Sucessfully")
        this.setState({
            isLoggedIn: false
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <Main gapiResponse={this.state.apiResponse} logOutCallback={this.logOut} />
            )
        }
        else {
            return (

                <div className="App">
                    <GoogleLogin
                        clientId="386084313360-fnf46hob51agpaa1d6epbb6f4v18e65q.apps.googleusercontent.com"
                        buttonText={<i className="fa fa-google text-white">&nbsp;Login</i>}
                        icon={false}
                        theme="dark"
                        onSuccess={this.Authenticate}
                        onFailure={this.Authenticate}
                    />
                </div>
            );
        }

    }
}
export default GoogleAuth;
