import React from "react"
import { getWordLearnData } from "../backendapi";

export class LearnTable extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            wordsInAnticipation: 0,
            wordsToRepeat: 0
        }
    }

    componentDidMount()
    {
        let promise = getWordLearnData();
        promise.then( (data) =>
        {
            this.setState({wordsToRepeat: data.toRepeat, wordsInAnticipation: data.inAnticipation });
        });
    }

    render()
    {
        const {wordsInAnticipation, wordsToRepeat} = this.state;

        return (<div className="col s5">

            <div className="row">
                <h5>Learn Words</h5>
            </div>

            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>

            <div className="collection">
                
                <a className="collection-item" href="#!">
                    <div className="row"></div> 
                    <span className="new badge light-blue darken-2" data-badge-caption="">{wordsInAnticipation}</span>
                    <span style={{color:"#0F1035"}}>Слова на созревании</span>
                    <div className="row"></div>
                </a>
                
                <a className="collection-item" href="#!" onClick={ () => this.props.openFrame("Train") }>
                    <div className="row"></div>
                    <span className="new badge amber lighten-3" data-badge-caption="" style={{color:"#0F1035"}}>{wordsToRepeat}</span>
                    Тренировать слова
                    <div className="row"></div>
                </a>
                <a className="collection-item" href="#!" onClick={ () => this.props.openFrame("Dictionary") }>
                    <div className="row"></div>
                    <span className="new badge white" data-badge-caption="" style={{color:"#0288d1"}}>
                        <i className="small material-icons">bookmark</i>
                    </span>
                    Открыть словарь
                    <div className="row"></div>
                </a>

            </div>

        </div>)
    }

    
}