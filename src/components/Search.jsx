import React from "react";

export class Search extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            search: '',
        }
    }

    render()
    {
        return (<div className="input-field">
            <div>
                <input 
                    id="search"
                    type="search" 
                    className="validate" 
                    value={this.state.search}
                    onChange={ (event) => {
                        this.setState({search: event.target.value});
                        this.props.searchCB(event.target.value);
                    } }
                />
                <label htmlFor="search">Search</label>
            </div>
        </div>);
    }
}