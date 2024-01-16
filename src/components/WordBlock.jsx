import React from "react";
import { addWordToDict, removeWordFromDict } from "../backendapi";

export class WordBlock extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            added: props.added,
            word: props.word,
            translation: props.translation,
            workingWithDict: false
        }
    }

    changeWordState = () =>
    {
        this.setState({workingWithDict: true});

        if (!this.state.added)
        {
            let promise = addWordToDict(this.state.word, this.state.translation);
            promise.then( 
                (success) => 
            {   
                this.setState({workingWithDict: false, added: !this.state.added});
            },
                (error) =>
            {
                this.setState({workingWithDict: false});
            });
        } else 
        {
            let promise = removeWordFromDict(this.state.word, this.state.translation);
            promise.then( 
                (success) => 
            {   
                this.setState({workingWithDict: false, added: !this.state.added});
            },
                (error) =>
            {
                this.setState({workingWithDict: false});
            });
        }

        
    }

    render()
    {
        const {added, word, translation, workingWithDict} = this.state;

        return(
            <div className="row">
                <div className="col s10" style={{textAlign:"left"}}>{word} - {translation}</div>

                <div className="col s2">
                    <button 
                        className={"btn waves-effect waves-light " + (!added ? "light-blue darken-2" : "light-blue lighten-5")}
                        disabled={workingWithDict}
                        onClick={this.changeWordState}
                    >
                        {
                            workingWithDict ?
                            <div className="preloader-wrapper small active" style={{fontSize: "50%"}}>
                                <div className="spinner-layer spinner-green-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                                </div>
                            </div> :
                            <>
                                {   !added ?
                                    <i className="material-icons" style={{color:"#DCF2F1"}}>add</i> :
                                    <i className="material-icons" style={{color:"#0F1035"}}>remove</i>
                                }
                            </>
                        }
                    </button>
                </div>
            </div>
        )
    }
}