import { Fragment, useState, ChangeEvent } from 'react';
import Board, { TrelloBoardType } from './board';
import Modal from './modal';

// Helps in generating random ids
import { nanoid } from 'nanoid';

// Base Data storing
import Data from '../data/data.json';

const TrelloBoard = () => {
    const userLocalData = localStorage.getItem("trello-data");
    const trelloData: TrelloBoardType[] = userLocalData && JSON.parse(userLocalData) || Data;
    const  appName = "TRELLO (TS)";  // In future we can change the name from data as well
    const [boardsData, setBoardsData] = useState(trelloData);
    const [currBoardId, setCurrBoardId] = useState(trelloData[0].id);
    const [showModal, setShowModal] = useState(false);

    const saveBoardCallback = (newBoardData: any) => {
        const updatedBoardsData = boardsData.map( (board: TrelloBoardType)=>{
            if(board.id === currBoardId){
                board.data = newBoardData;
            }

            return board;
        });
        localStorage.setItem("trello-data", JSON.stringify(updatedBoardsData));
        setBoardsData(updatedBoardsData);
    }

    const getBoard = () => {
        const currBoard = boardsData.filter((board: any)=>{
            return board.id === currBoardId;
        })[0];

        return(
            <Board key={nanoid()} boardId={currBoard.id} boardName={currBoard.name} dragDropData={currBoard.data} saveBoardCallback={saveBoardCallback}/>
        )
    }
    
    const changeBoard = (event: ChangeEvent<HTMLSelectElement>)=>{
        setCurrBoardId(event.target.value);
    }

    const getBoardList = () => (
            <select id="board-list" className="board-list" onChange={changeBoard} value={currBoardId}>
                {
                    boardsData.map(boardElm=>{
                        return(
                            <option key={nanoid()} value={boardElm.id}>{boardElm.name}</option>
                        )
                    })
                }
            </select>
        )

    const addNewBoard = (title: string)=>{
        const updatedBoardsData:TrelloBoardType[]  = [...boardsData],
            newId: string = nanoid();

        updatedBoardsData.push({
            "name": title,
            "id": newId,
            "data":[]
        });

        localStorage.setItem("trello-data", JSON.stringify(updatedBoardsData));
        setBoardsData(updatedBoardsData);
        setCurrBoardId(newId);
    }

    const toggleModalState = ()=> {
        setShowModal((prevState: boolean) => !prevState);
    }


    return (
        <div className="trello-app-holder">
            <div className="top-menu">
                <div className="app-title">{appName}</div>
                <div className="board-list-holder">
                    <div className="board-change-text">Boards</div>
                    {getBoardList()}
                    <div className="add-board-btn" onClick={toggleModalState}>+ Add Board</div>
                    {showModal?
                        <Modal modalTitle='Board Title' showOnlyTitle={true} show={showModal} successCallback={addNewBoard} cancelCallback={toggleModalState}/>:<Fragment />
                    }
                </div>
            </div>
            {getBoard()}
        </div>
    )
}

export default TrelloBoard;