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

        // no need to update state as we are accessing object and it is 
        // call by reference so gets updated automatically

        // add event for trigger to save main trello board pending & save to localstorage
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

    addTaskCallback=(droppableId)=>{
        let droppableDetails = this.getDroppableDetails(droppableId),
            {saveBoardCallback} = this.props,
            updatedState,
            newId = nanoid();
        droppableDetails.draggables.push({
            id: newId,
            text: 'test-' + newId
        });
        updatedState = [...this.state.boardData];
        saveBoardCallback(updatedState);
    }

    addListCallback=(event)=>{
        let boardDataCopy = JSON.parse(JSON.stringify(this.state.boardData)),
            {saveBoardCallback} = this.props,
            newId = nanoid();

        boardDataCopy.push({
            "id": newId,
            "text": "Test Tab-" + newId ,
            "draggables":[]
        });
        saveBoardCallback(boardDataCopy);
    }

    render(){
        let {boardId, boardName} = this.props;
        return (
            <div className="board-holder" id={boardId}>
                <div className="board-title-holder">
                    <h2>{boardName}</h2>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <DragDrop droppableData={this.state.boardData} addTaskCallback={this.addTaskCallback} addListCallback={this.addListCallback}/>
                </DragDropContext>
            </div>
        )
    }
}