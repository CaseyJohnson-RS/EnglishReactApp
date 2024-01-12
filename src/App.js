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

export class App extends React.Component
{
  
  constructor(props)
  {
    super(props);
    this.state = { 
      currentFrame: "",
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

        else if (["SignIn", "SignUp", "Main", "Dictionary", "Train", "AppError"].includes(name))

          this.setState({ currentFrame: name });

      }, 
      (error) =>  // Error
      {
        this.setState({ currentFrame: "AppError"});
      }
    );

  }

  render()
  {
    const {currentFrame } = this.state;
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
            />
            <AppError />
          </>
        : 
          <>
            <Header 
              underLogoText="Loading..."
              buttonText="Loading..."
              logoEvent={()=>openFrame("Main")}
              buttonEvent={()=>openFrame("Main")}
            />
            <Preloader />
          </>
      }

      <Footer />
    </>);
  }

}
