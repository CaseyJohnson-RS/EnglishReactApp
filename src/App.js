import React from "react";
import { checkLogin } from "./backendapi";

// Frames
import { Preloader } from "./frames/Preloader";
import { Main } from "./frames/Main";
import { SignIn } from "./frames/SignIn"
import { SignUp } from "./frames/SignUp"
import { Dictionary } from "./frames/Dictionary";
import { Train } from "./frames/Train";
import { AppError } from "./frames/AppError";

// Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Profile } from "./components/Profile";

const frameList = ["SignIn", "SignUp", "Main", "Dictionary", "Train", "AppError"];

export class App extends React.Component
{
  
  constructor(props)
  {
    super(props);
    this.state = { 
      currentFrame: "",
      profileOpen: false
    };
  }

  componentDidMount()
  {
    this.openFrame("Main");
    
  }

  openFrame = (name) => 
  {
    console.log("Open frame: " + name);

    this.setState( {currentFrame: "Preloader"} );

    let promise = checkLogin();
    promise.then( 
      (loggedIn) => { // Success

        if (!loggedIn)
        
          this.setState({ currentFrame: (name === "SignIn" ? "SignIn" : "SignUp") });

        else if (frameList.includes(name))

          this.setState({ currentFrame: name });

      }, 
      (error) =>  // Error
      {
        this.setState({ currentFrame: "AppError"});
      }
    );
  }

  closeProfile = () => this.setState({profileOpen: false});
  openProfile = () => this.setState({profileOpen: true});

  render()
  {
    const {currentFrame, profileOpen} = this.state;
    const openFrame = this.openFrame;

    return ( <>
      {
        currentFrame === "SignIn" ?
          <>
            <Header 
              underLogoText="sign in"
              buttonText="Sign Up"
              logoEvent={()=>openFrame("Main")}
              buttonEvent={()=>openFrame("SignUp")}
            />
            <SignIn openFrame={openFrame}  />
          </>
        : currentFrame === "SignUp" ?
          <> 
            <Header 
              underLogoText="sign up"
              buttonText="Sign In"
              logoEvent={()=>openFrame("Main")}
              buttonEvent={()=>openFrame("SignIn")}
            />
            <SignUp openFrame={openFrame} />
          </>
        : currentFrame === "Main" ?
          <>
            <Header 
              underLogoText="Main"
              buttonText="Profile"
              buttonEvent={this.openProfile}
            />
            <Main openFrame={openFrame} />
          </>
        : currentFrame === "Dictionary" ?
          <>
            <Dictionary openFrame={openFrame} />
          </>
        : currentFrame === "Train" ?
          <>
            <Train openFrame={openFrame} />
          </>
        : currentFrame === "AppError" ?
          <>
            <Header 
              underLogoText="Something went wrong..."
              buttonText="Sorry"
              logoEvent={()=>openFrame("Main")}
              buttonEvent={()=>openFrame("Main")}
            />
            <AppError />
          </>
        : 
          <>
            <Header 
              underLogoText="Loading..."
              buttonText="Loading..."
            />
            <Preloader />
          </>
      }

      <Profile open={profileOpen} onClose={this.closeProfile}/>

      <Footer />
    </>);
  }

}
