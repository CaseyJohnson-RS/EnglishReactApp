import { getProfileInfo } from "../backendapi";
import React from "react";

/*
"firstName": "name",
"lastName": "last",
"level": "Beginner",
"date": "Sat Nov 11 16:18:27 GMT+07:00 2023",
"words": 0,
"email": "email"
*/

export class Profile extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            dataLoaded: false,
            firstName: "",
            lastName: "",
            level: "",
            date: "",
            words: 0,
            email: ""
        }
    }

    componentDidMount()
    {
        let promise = getProfileInfo();
        promise.then( (result) =>
        {

            let parts = result.date.split(' ');
            let date = parts[0] + " " + parts[1] + " " + parts[2] + " " + parts[5];

            this.setState({
                dataLoaded: true,
                firstName: result.firstName,
                lastName: result.lastName,
                level: result.level,
                date: date,
                words: result.words,
                email: result.email
            });

        });
    }

    render()
    {
        const _style = this.props.open ? {zIndex: "1003", display: "block", opacity: "1", top: "10%", transform: "scaleX(1) scaleY(1)"} : {};
        const {dataLoaded, firstName, lastName, level, date, words, email} = this.state;

        return (<div className="modal" style={_style}>
            <div className="modal-content">
                { 
                    dataLoaded ?
                    <>
                        <h4>{firstName + " " + lastName}</h4>
                        <p>Level: {level}</p>
                        <p>Words: {words}</p>
                        <p>Start: {date}</p>
                        <p>email: {email}</p>
                    </> :
                    <>
                        <h5>Loading...</h5>
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>
                    </>
            }
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={this.props.onClose} className="modal-close waves-effect waves-green btn-flat" >Close</a>
            </div>
        </div>);
    }
}