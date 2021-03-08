import {Component, Fragment} from 'react';
import Board from './board';

// Helps in generating random ids
import { nanoid } from 'nanoid'

// Base Data storing
import Data from '../data/data.json';

export default class TrelloBoard extends Component{
    getBoards(){
        let boardsData = Data;
        return(
            <Fragment>
                {
                    boardsData.map(boardElm=>{
                        return(
                            <Board key={nanoid()} boardId={boardElm.id} boardName={boardElm.name} dragDropData={boardElm.data} />
                        )
                    })
                }
            </Fragment>
        )
    }
    render(){
        return (
            <div className="trello-app-holder">
                {this.getBoards()}
            </div>
        )
    }
}