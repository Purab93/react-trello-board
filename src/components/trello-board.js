import {Component, Fragment} from 'react';
import Board from './board';
import Modal from './modal';

// Helps in generating random ids
import { nanoid } from 'nanoid';

// Base Data storing
import Data from '../data/data.json';

export default class TrelloBoard extends Component{

    constructor(props){
        super(props);
        let trelloData = JSON.parse(localStorage.getItem("trello-data")) || Data;
        this.state={
            boardsData: trelloData,
            appName : "TRELLO", // In future we can change the name from data as well
            currBoardId : trelloData[0].id,
            showModal: false
        }
    }

    getBoard(){
        let {currBoardId, boardsData} = this.state,
            currBoard;

            currBoard = boardsData.filter((board)=>{
                return board.id === currBoardId;
            })[0];

        return(
            <Board key={nanoid()} boardId={currBoard.id} boardName={currBoard.name} dragDropData={currBoard.data} saveBoardCallback={this.saveBoardCallback}/>
        )
    }
    
    changeBoard = (event)=>{
        this.setState({
            currBoardId: event.target.value
        })
    }

    getBoardList(){
        let boardsData = this.state.boardsData;
        return(
            <select id="board-list" className="board-list" onChange={this.changeBoard} value={this.state.currBoardId}>
                {
                    boardsData.map(boardElm=>{
                        return(
                            <option key={nanoid()} value={boardElm.id}>{boardElm.name}</option>
                        )
                    })
                }
            </select>
        )
    }

    saveBoardCallback = (newBoardData)=>{
        let {currBoardId, boardsData} = this.state,
            updatedBoardsData;

        updatedBoardsData = boardsData.map(board=>{
            if(board.id === currBoardId){
                board.data = newBoardData;
            };
            return board;
        });
        localStorage.setItem("trello-data", JSON.stringify(updatedBoardsData));
        this.setState({
            'boardsData' : updatedBoardsData
        });
    }

    addNewBoard = (title)=>{
        let {boardsData} = this.state,
            updatedBoardsData = [...boardsData],
            newId = nanoid();

        updatedBoardsData.push({
            "name": title,
            "id": newId,
            "data":[]
        });

        localStorage.setItem("trello-data", JSON.stringify(updatedBoardsData));
        this.setState({
            'boardsData' : updatedBoardsData,
            'currBoardId': newId
        });
    }

    toggleModalState = (event)=> {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render(){
        return (
            <div className="trello-app-holder">
                <div className="top-menu">
                    <div className="app-title">{this.state.appName}</div>
                    <div className="board-list-holder">
                        <div className="board-change-text">Boards</div>
                        {this.getBoardList()}
                        <div className="add-board-btn" onClick={this.toggleModalState}>+ Add Board</div>
                        {this.state.showModal?
                            <Modal modalTitle='Board Title' showOnlyTitle={true} show={this.state.showModal} successCallback={this.addNewBoard} cancelCallback={this.toggleModalState}/>:<Fragment />
                        }
                    </div>
                </div>
                {this.getBoard()}
            </div>
        )
    }
}