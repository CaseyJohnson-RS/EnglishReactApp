import React from "react";

export class DictWord extends React.Component 
{

    render()
    {
        const {word_eng, word_rus, trains} = this.props;

        

        return(<>
            <div className="col s3 card-panel">
                <div className="row">
                    <div className="col s6">
                        <h5 className="left">
                            {word_eng}
                        </h5>
                    </div>
                    <div className="col s6">
                        <h5 className="right">
                            {trains}
                        </h5>
                    </div>
                    <div className="col s9">
                        <p className="left" style={{color:"#0F1035", textAlign: "left"}}>
                            {word_rus}
                        </p>
                    </div>
                    <div className="col s3">
                        <p className="right">Trains</p>
                    </div>
                </div>
                
            </div>
            <div className="col s1"/>
        </>);
    }
}