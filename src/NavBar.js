import React from 'react';
import GoogleAuth from './GoogleAuth';

export default class Navbar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                <div class="navbar-brand text-white" >Dynamic Forms</div>
                <div class="ml-auto">
                    <GoogleAuth />
                </div>
            </div>
        )
    }
}