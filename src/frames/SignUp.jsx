import React from 'react';
import { signUp, emailExists } from '../backendapi';

function validateEmail(email) 
{
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email));
}

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",

            formSended: false,
            emailExists: false,
            sendButtonActive: false,
            tips: {
                firstName: "John",
                lastName: "Smith",
                email: "john.smith@example.com",
                password: "******"
            }
        };
    }

    sendForm = () => {
        const { firstName, lastName, email, password } = this.state;

        let promise = emailExists(email);

        promise.then( 
            result =>
        {
            if (result) {

                this.setState({ emailExists: true });   
            }
            else
            {
                signUp(firstName, lastName, email, password);

                this.setState({ formSended: true });

                setTimeout(() => this.props.openFrame("SignIn"), 1200);
            }
        },  
            error =>
        {
            this.props.openFrame("AppError");
        });

    }

    updateTips = (target) => 
    {
        let tips = {
            firstName: this.state.tips.firstName,
            lastName: this.state.tips.lastName,
            email: this.state.tips.email,
            password: this.state.tips.password
        }

        if (target.id === "firstName")
        {
            if (target.value.length > 0)
            
                tips.firstName = target.value.length < 2 ? "Make it longer" : "";
            
            else 

                tips.firstName = "John";
        } 
        else if (target.id === "lastName")
        {
            if (target.value.length > 0)
            
                tips.lastName = target.value.length < 2 ? "Make it longer" : "";
            
            else

                tips.lastName = "Smith";
        }
        else if (target.id === "email")
        {
            if (target.value.length > 0)
            {

                tips.email = validateEmail(target.value) ? "" : "Incorrect email";
                    
            } else 
            
                tips.email = "john.smith@example.com";

            if (this.state.emailExists)

                this.setState({emailExists: false});
        } 
        else if (target.id === "password")
        {
            if (target.value.length > 0)

                tips.password = target.value.length < 6 ? "Make it longer" : "";
            
            else 
            
                tips.password = "Example: ******";
        }

        this.setState({
            tips: {
                firstName: tips.firstName,
                lastName: tips.lastName,
                password: tips.password,
                email: tips.email
            },
            sendButtonActive: (tips.email.length + tips.password.length + tips.firstName.length + tips.lastName.length === 0)
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
        document.getElementById("firstName").focus();
    }

    render() {
        const {tips} = this.state;

        return (<main className="content">
            <div className="row" />
            <div className="row" />

            {
                !this.state.formSended ?
                    <>
                        <div className="container">
                            <div className="row">
                                <div className="col s6">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                id="firstName"
                                                type="text"
                                                className="validate"
                                                minLength="2"
                                                value={this.state.firstName}
                                                onChange={this.handleChange}
                                                required />
                                            <span className="helper-text left">{tips.firstName}</span>
                                            <label htmlFor="firstName">First name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                id="lastName"
                                                type="text"
                                                className="validate"
                                                minLength="2"
                                                value={this.state.lastName}
                                                onChange={this.handleChange}
                                                required />
                                            <span className="helper-text left">{tips.lastName}</span>
                                            <label htmlFor="firstName">Last name</label>
                                        </div>
                                    </div>

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
                                                Sign up<i className="material-icons right">done</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                { 
                                    this.state.emailExists ?
                                    <div className="col s6"><h6>Email exists!</h6> </div> : 
                                    <></>
                                }

                                <div className="col s2"></div>
                            </div>
                        </div>
                    </> :
                    <h5>Registration completed successfully! You can now log in.</h5>
            }


        </main>)
    }

}