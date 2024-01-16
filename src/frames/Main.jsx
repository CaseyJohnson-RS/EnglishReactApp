import { LearnTable } from "../components/LearnTable";
import { WordSearch } from "../components/WordSearch";


function Main(props)
{
    return (<main className="content">

        <div className="row">

            <div className="row" />
            <div className="row" />

            <WordSearch />
            
            <div className="col s2" />
            
            < LearnTable  />

        </div>
        
    </main>);
}

export {Main}