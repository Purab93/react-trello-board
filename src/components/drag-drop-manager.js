import {Component, Fragment} from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// Helps in generating random ids
import { nanoid } from 'nanoid'

export default class ListHolder extends Component{
    getDraggableElms(draggablesList){
        return (
            <div className="draggables-container">
                {
                    draggablesList.map((dragElm,index)=>{
                        return (
                            <Draggable draggableId={dragElm.id} key={nanoid()} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className="draggable-holder"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                        <div className="draggable-title-holder">{dragElm.text}</div>
                                    </div>
                                )}
                            </Draggable>
                        )
                    })
                }
            </div>
        )
    }

    addTask = (event)=>{
        let droppableId = event.currentTarget.parentElement.dataset.rbdDroppableId;
        this.props.addTaskCallback(droppableId);
    }
    // kept additional layer incase we need to perform any functionalities 
    addList = (event)=>{
        this.props.addListCallback(event);
    }

    getDroppableDom(){
        return (
            <Fragment>
                {   
                    this.props.droppableData.map((droppableItem)=>{
                        return (
                            <Droppable droppableId={droppableItem.id} key={nanoid()}>
                                {(provided, snapshot) => (
                                    <div
                                    className="droppable-holder"
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : '#ebecf0' }}
                                    {...provided.droppableProps}
                                    >
                                        <div className="droppable-title-holder">
                                            {droppableItem.text}
                                        </div>
                                        {this.getDraggableElms(droppableItem.draggables)}
                                        {provided.placeholder}
                                        <div ></div>
                                        <div className="add-draggable-btn" onClick={this.addTask}>+ Add Another Card</div>
                                    </div>
                                )}
                            </Droppable>
                        )
                    })
                }
            </Fragment>
        )
    }

    render(){
        return (
            <div className="list-holder">
                {this.getDroppableDom()}
                <div className="add-list-btn" onClick={this.addList}>+ Add Another List</div>
            </div>
        )
    }
}