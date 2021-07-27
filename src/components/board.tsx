import { useState} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DragDrop from './drag-drop-manager';

// Helps in generating random ids
import { nanoid } from 'nanoid';

import { DroppableDataType } from './drop-elm';


export interface TrelloBoardType {
    name: string;
    id: string;
    data: DroppableDataType[];
}

interface TrelloBoardProps {
    boardId: string,
    boardName: string,
    dragDropData: DroppableDataType[],
    saveBoardCallback: (boardData: DroppableDataType[]) => void;
}

const TrelloBoard = (props: TrelloBoardProps) => {
    const { dragDropData, boardId, boardName, saveBoardCallback } = props;
    const [boardData, setBoardData] = useState(dragDropData);

    const updateStateOnDrop = (sourceID: string, destinationId: string, draggableId: string) => {
        const sourceDroppable: any =  getDroppableDetails(sourceID);
        const destinationDroppable: any = getDroppableDetails(destinationId);

        let currentObj: any; 
            
        const sourceArrayFinal: any[] = sourceDroppable.draggables.filter((obj: any)=>{
            if(draggableId === obj.id){
                currentObj = obj;
            }
            return draggableId !== obj.id;
        });

        sourceDroppable.draggables = sourceArrayFinal;
        destinationDroppable.draggables.push(currentObj);
        saveBoardCallback(boardData);
    }

    const getDroppableDetails = (droppableId: string) => {
        const droppableDetails = boardData.filter((elm: DroppableDataType)=>{
            return elm.id === droppableId;
        });

        return droppableDetails[0];
    }
    
    const onDragEnd = (result: any) => {
        const { source, destination, draggableId } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        // if source & destination droppable block different then only update
        if (source.droppableId !== destination.droppableId) {
            updateStateOnDrop(
                source.droppableId,
                destination.droppableId,
                draggableId
            );
        }
    };

    const addTaskCallback=(droppableId: string,title: string,text: string) => {
        const droppableDetails = getDroppableDetails(droppableId);

        droppableDetails.draggables.push({
            id: nanoid(),
            title: title,
            text: text
        });
        const updatedState = [...boardData];
        saveBoardCallback(updatedState);
    }

    const addListCallback = (title: string) => {
        const boardDataCopy = JSON.parse(JSON.stringify(boardData));

        boardDataCopy.push({
            "id": nanoid(),
            "title": title ,
            "draggables":[]
        });
        saveBoardCallback(boardDataCopy);
    }

    const updateDragDropData = (droppableElm: any) => {
        const droppableDetails = getDroppableDetails(droppableElm.id);

        droppableDetails.draggables = droppableElm.draggables;

        const updatedState = [...boardData];
        saveBoardCallback(updatedState);
    }  

    const updateDropList = (droppableElmId: string,title: string) => {
        const droppableDetails = getDroppableDetails(droppableElmId);
        droppableDetails.title = title;
        const updatedState = [...boardData];
        saveBoardCallback(updatedState);
    }  

    return (
        <div className="board-holder" id={boardId}>
            <div className="board-title-holder">
                <h2>{boardName}</h2>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <DragDrop updateDragDropData={updateDragDropData} droppableData={boardData} addTaskCallback={addTaskCallback} addListCallback={addListCallback} updateDropList={updateDropList} />
            </DragDropContext>
        </div>
    );
}

export default TrelloBoard;