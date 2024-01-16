import React from "react"
import { trainWord, getFiveTrainWords } from "../backendapi";
import { Countdown } from "../components/Countdown";
import { EnglishToRussian } from "./trainings/EnglishToRussian";
import { RussianToEnglish } from "./trainings/RussianToEnglish";
import { Writening } from "./trainings/Writening";


export class Train extends React.Component
{

    constructor(props)
    {
        super(props);
        
        this.state = {
            state: "start", // start, tr_engToRus, tr_rusToEnd, tr_writening, finish
            trainIsPossible: false,
            words: [],
            loading: false,
            mistakeData: []
        }
    }

    checkTrainingPossibility = () =>
    {
        this.setState({loading: true});

        let promise = getFiveTrainWords();
        promise.then((res) =>
        {
            if(res)
                this.setState({words: res, trainIsPossible: true, loading: false});
        });
    }

    onCountdownEnd = () => 
    {
        this.setState({state: "tr_engToRus"});
    }

/*
data = [
    {
        id: 0,
        mistake: false
    },
    {
        id: 1,
        mistake: true
    }, ...
] */

    onEngToRusEnd = (data) =>
    {
        this.setState({state: "tr_rusToEnd",mistakeData: data});
    }

    onRusToEngEnd = (data) =>
    {
        let mistakeData = this.state.mistakeData;
        for(let i = 0; i < 5; ++i)
        {
            for(let j = 0; j < 5; ++j)
            {
                if (mistakeData[i].id === data[j].id)
                {
                    mistakeData[i].mistake = mistakeData[i].mistake && data[j].mistake;
                }
            }
        }
        this.setState({state: "tr_writening",mistakeData: mistakeData});
    }

    onWriteningEnd = (data) =>
    {
        let mistakeData = this.state.mistakeData;
        for(let i = 0; i < 5; ++i)
        {
            for(let j = 0; j < 5; ++j)
            {
                if (mistakeData[i].id === data[j].id)
                {
                    mistakeData[i].mistake = mistakeData[i].mistake && data[j].mistake;
                }
            }
        }
        this.setState({state: "finish",mistakeData: mistakeData});
    }

    componentDidMount()
    {
        this.checkTrainingPossibility();
    }

    render()
    {
        const {state, trainIsPossible, loading, words} = this.state;

        return (<main className="content">
            {
                loading ?
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                    <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div> :
                <>
                    {
                        (!trainIsPossible) ?
                        <div className="center">
                            <h4>
                                You don't have enough words in your vocabulary to do the training. Complete your vocabulary and come back again!
                            </h4>
                        </div> :
                        <>{
                            state === "start" ?
                            <Countdown timer={4} callback={this.onCountdownEnd} /> :
                            state === "tr_engToRus" ?
                            <EnglishToRussian words={words} callback={this.onEngToRusEnd}/> :
                            state === "tr_rusToEng" ?
                            <RussianToEnglish words={words} callback={this.onRusToEngEnd}/> :
                            state === "tr_writening" ?
                            <Writening words={words} callback={this.onWriteningEnd}/> :
                            state === "finish" ?
                            <div className="container">
                                <h5>Finish!</h5>
                            </div> : <></>
                        }</>

                    }
                </>
            }
        </main>);
    }

}