import React from "react"


export class Countdown extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = 
        {
            count: props.timer
        }
    }

    tick = () =>
    {
        let count = this.state.count;
        if (count <= 0) 
        {
            this.props.callback();
        } else {
            count--;
            this.setState({count: count});
            setTimeout(this.tick, 1000);
        }
    }

    componentDidMount()
    {
        this.tick();
    }

    render()
    {
        const {count} = this.state;

        return(
            <h4>Training in {count}...</h4>
        );

    }

}