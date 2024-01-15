import React from 'react';
import { signIn } from '../backendapi';

function validateEmail(email) 
{
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email));
}

export class SignIn extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            tips: {
                email: "john.smith@example.com",
                password: "Example: ******"
            },
            sendButtonActive: false,
            sendFormResult: ""
        }
    }

    sendForm = () => {

        this.setState({sendFormResult: "Loading"});
        
        let promise = signIn(this.state.email, this.state.password);
        promise.then( (result) =>
        {
            if (result)
            {
                this.setState({sendFormResult: "LoggedIn"});
                setTimeout( ()=>this.props.openFrame("Main"), 1000);
            } else 
            {
                this.setState({sendFormResult: "WrongEmailOrPass"});
            }
        },
        (error) =>
        {
            this.props.openFrame("AppError");
        });

    }

    updateTips = (target) => 
    {
        
        let tips = {
            email: this.state.tips.email,
            password: this.state.tips.password
        }
        
        if (target.id === "email")
        {
            if (target.value.length > 0)
            {

                tips.email = validateEmail(target.value) ? "" : "Incorrect email";
                    
            } else 
            
                tips.email = "john.smith@example.com";

            if (this.state.sendFormResult === "WrongEmailOrPass")

                this.setState({sendFormResult: ""});
        } 
        else if (target.id === "password")
        {
            if (target.value.length > 0)

                tips.password = target.value.length < 6 ? "Make it longer" : "";
            
            else 
            
                tips.password = "Example: ******";
            
            if (this.state.sendFormResult === "WrongEmailOrPass")

                this.setState({sendFormResult: ""});
        }

        this.setState({
            tips: {
                password: tips.password,
                email: tips.email
            },
            sendButtonActive: (tips.email.length + tips.password.length === 0)
        });
        
    }

    handleChange = (event) => 
    {
        this.setState({
            [event.target.id]:
                event.target.value
        });

        this.updateTips(event.target);
    }

    componentDidMount() 
    {
        document.getElementById("email").focus();
    }

    render() {
        const {tips, sendFormResult} = this.state;

        return (<main className="content">
            <div className="row" />
            <div className="row" />

            <div className="container">
                <div className="row">
                    <div className="col s6">

                        <div style={{display: ((sendFormResult === "WrongEmailOrPass" || sendFormResult.length === 0) ? "block" : "none")}}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="email"
                                        type="email"
                                        className={"validate"}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required />
                                    <span className="helper-text left">{tips.email}</span>
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="password"
                                        type="password"
                                        className="validate"
                                        minLength="6"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required />
                                    <span className="helper-text left">{tips.password}</span>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <button
                                        className="btn btn-large btn-register waves-effect waves-light"
                                        type="submit"
                                        onClick={this.sendForm} disabled={!this.state.sendButtonActive} >
                                        Sign In<i className="material-icons right">login</i>
                                    </button>
                                </div>
                            </div> 
                        </div>

                    { 
                        (sendFormResult === "Loading") ?
                        <>
                            <h6>Loading...</h6>
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        </> :
                        (sendFormResult === "LoggedIn") ?
                        <>
                            <h6>Successful!</h6>
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        </> : 
                        <></>
                    }
                    </div>

                    {
                        (sendFormResult === "WrongEmailOrPass") ?
                        <>  
                            <div className="col s6">
                                <h6>Wrong email or password!</h6>
                            </div>
                        </> : 
                        <></>
                    }
                </div>
            </div>
        </main>)
    }

}