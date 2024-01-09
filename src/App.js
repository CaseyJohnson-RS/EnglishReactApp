import React from "react";
import { checkLogin } from "./backendapi";

// Frames
import { Preloader } from "./frames/Preloader";
import { Main } from "./frames/Main";
import { SignIn } from "./frames/SignIn"
import { SignUp } from "./frames/SignUp"
import { Dictionary } from "./frames/Dictionary";
import { Train } from "./frames/Train";

// Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export class App extends React.Component
{
  
  constructor(props)
  {
    super(props);
    this.state = { currentFrame: "Main" };
  }

  openFrame = (name) => 
  {
    console.log("Open frame: " + name);

    let promise = checkLogin();

    this.setState( {currentFrame: "Preloader"} );

    promise.then( (loggedIn) => {

      if ( !loggedIn )
      
        this.setState({ currentFrame: "SignUp" });

      else if (["SignIn", "SignUp", "Main", "Dictionary", "Train"].includes(name))

        this.setState({ currentFrame: name });

    })

  }

  render()
  {
    const {currentFrame} = this.state;

    return ( <>
      {
        currentFrame === "SignIn" ?
          <> 
            <SignIn openFrame={this.openFrame} />
          </>
        : currentFrame === "SignUp" ?
          <> 
            <SignUp openFrame={this.openFrame} />
          </>
        : currentFrame === "Main" ?
          <>
            <Main openFrame={this.openFrame} />
          </>
        : currentFrame === "Dictionary" ?
          <>
            <Dictionary openFrame={this.openFrame} />
          </>
        : currentFrame === "Train" ?
          <>
            <Train openFrame={this.openFrame} />
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

      <Footer />
    </>);
  }

}
