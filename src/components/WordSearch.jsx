import { WordBlock } from "./WordBlock";
import { Search } from "./Search";
import { getRandomWords, getTenWordsByKey } from "../backendapi"; 
import React from "react";

export class WordSearch extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            words: [],
            loading: false
        }
    }

    componentDidMount()
    {
        // Returns 5 random words
        this.search("");
    }

    search = (str) => 
    {
        this.setState({loading: true});

        if (str.length === 0)
        {
            let promise = getRandomWords();
            promise.then( (result)=>
            {
                this.setState({words: result, loading: false});
            });
        } else {
            let promise = getTenWordsByKey();
            promise.then( (result)=>
            {
                this.setState({words: result, loading: false});
            });
        }
    }

    render()
    {
        return (<div className="col s5">

            <div className="row">
                <h5>Word Search</h5>
            </div>

            <div className="row">
                <Search searchCB={this.search} />
            </div>

            {
                this.state.loading ?
                <div className="progress">
                    <div className="indeterminate"></div>
                </div> :
                <div className="row">
                    {
                        this.state.words.map((word) => (
                            <WordBlock key={word.id} {...word}/>
                        ))
                    }
                </div>

            }

            

        </div>)
    }
}