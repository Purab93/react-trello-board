import {Component} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DragDrop from './drag-drop-manager';

export default class TrelloBoard extends Component{
    constructor(props) {
        super(props)
        this.state = {
            droppableData: this.props.dragDropData
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
        let droppableDetails = this.state.droppableData.filter((elm)=>{
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
    render(){
        let {boardId,boardName} = this.props;
        return (
            <div className="board-holder" id={boardId}>
                <h1>{boardName}</h1>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <DragDrop droppableData={this.state.droppableData}/>
                </DragDropContext>
            </div>
        )
    }
}