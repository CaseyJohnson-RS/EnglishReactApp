import React from 'react';
import { DictWord } from '../components/DictWord';
import { getAllAddedWords } from '../backendapi';


export class Dictionary extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            words: [],
            loading: false
        };
    }

    loadWords = () =>
    {
        this.setState({loading: true});

        let promise = getAllAddedWords();
        promise.then( (words) =>
        {
            this.setState({words: words, loading: false});
        });
    }

    componentDidMount()
    {
        this.loadWords();
    }

    render() {
        return (<main className="content">
            
            {
                this.state.loading ?
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                    </div>
                </div> :
                <div className="container">
                    <div className="row">
                        {
                            this.state.words.map((word) => (
                                <DictWord key={word.id} {...word}/>
                            ))
                        }
                    </div>
                </div>
            }
        </main>)
    }

}