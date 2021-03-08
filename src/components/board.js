import {Component} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DragDrop from './drag-drop-manager';

// Helps in generating random ids
import { nanoid } from 'nanoid';

export default class TrelloBoard extends Component{
    constructor(props) {
        super(props)
        this.state = {
            boardData: this.props.dragDropData
        }
    }
    updateStateOnDrop(sourceID, destinationId, draggableId){
        let currentObj, sourceArrayFinal, sourceDroppable, destinationDroppable;
            
            sourceDroppable =  this.getDroppableDetails(sourceID);
            destinationDroppable = this.getDroppableDetails(destinationId);

            sourceArrayFinal = sourceDroppable.draggables.filter((obj)=>{
                if(draggableId === obj.id){
                    currentObj = obj;
                }
                return draggableId !== obj.id;
            });

        sourceDroppable.draggables = sourceArrayFinal;
        destinationDroppable.draggables.push(currentObj);
        this.props.saveBoardCallback(this.state.boardData);
    };

    getDroppableDetails(droppableId){
        let droppableDetails = this.state.boardData.filter((elm)=>{
            return elm.id === droppableId;
        });

        return droppableDetails[0];
    }
    
    onDragEnd = result => {
        const { source, destination, draggableId } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        // if source & destination droppable block different then only update
        if (source.droppableId !== destination.droppableId) {
            this.updateStateOnDrop(
                source.droppableId,
                destination.droppableId,
                draggableId
            );
        }
    };

    addTaskCallback=(droppableId,title,text)=>{
        let droppableDetails = this.getDroppableDetails(droppableId),
            {saveBoardCallback} = this.props,
            updatedState;

        droppableDetails.draggables.push({
            id: nanoid(),
            title: title,
            text: text
        });
        updatedState = [...this.state.boardData];
        saveBoardCallback(updatedState);
    }

    addListCallback=(title)=>{
        let boardDataCopy = JSON.parse(JSON.stringify(this.state.boardData)),
            {saveBoardCallback} = this.props;

        boardDataCopy.push({
            "id": nanoid(),
            "title": title ,
            "draggables":[]
        });
        saveBoardCallback(boardDataCopy);
    }

    updateDragDropData = (droppableElm)=>{
        let droppableDetails = this.getDroppableDetails(droppableElm.id),
            {saveBoardCallback} = this.props,
            updatedState;
        droppableDetails.draggables = droppableElm.draggables;
        updatedState = [...this.state.boardData];
        saveBoardCallback(updatedState);
    }  

    updateDropList = (droppableElmId,title)=>{
        let droppableDetails = this.getDroppableDetails(droppableElmId),
            {saveBoardCallback} = this.props,
            updatedState;
        droppableDetails.title = title;
        updatedState = [...this.state.boardData];
        saveBoardCallback(updatedState);
    }  

    render(){
        let {boardId, boardName} = this.props;
        return (
            <div className="board-holder" id={boardId}>
                <div className="board-title-holder">
                    <h2>{boardName}</h2>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <DragDrop updateDragDropData={this.updateDragDropData} droppableData={this.state.boardData} addTaskCallback={this.addTaskCallback} addListCallback={this.addListCallback} updateDropList={this.updateDropList} />
                </DragDropContext>
            </div>
        )
    }
}