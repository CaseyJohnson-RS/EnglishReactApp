import React from "react";
import { checkLogin } from "./backendapi";
import { Preloader } from "./frames/Preloader";
import { Main } from "./frames/Main";
import { Authorization } from "./frames/Authorization";
import { Dictionary } from "./frames/Dictionary";
import { Train } from "./frames/Train";

export class App extends React.Component
{
  
  constructor(props)
  {
    super(props);
    this.state = { currentFrame: "" };
  }

  componentDidMount()
  {
    this.openFrame("Main");
  }

  openFrame = (name) => 
  {
    console.log("Open frame: " + name);

    let promise = checkLogin();

    this.setState( {currentFrame: "Preloader"} );

    promise.then( (loggedIn) => {

      if ( !loggedIn )
      
        this.setState({ currentFrame: "Authorization" });

      else if (["Authorization", "Main", "Dictionary", "Train"].includes(name))

        this.setState({ currentFrame: name });

    })

  }

  render()
  {
    const {currentFrame} = this.state;

    return ( <>
      {
        currentFrame === "Authorization" ?
          <Authorization openFrame={this.openFrame} />
        : currentFrame === "Main" ?
          <Main openFrame={this.openFrame} />
        : currentFrame === "Dictionary" ?
          <Dictionary openFrame={this.openFrame} />
        : currentFrame === "Train" ?
          <Train openFrame={this.openFrame} />
        : <Preloader />
      }
    </>);
  }

}
