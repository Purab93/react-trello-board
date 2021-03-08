import {Component, Fragment} from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// Helps in generating random ids
import { nanoid } from 'nanoid'

export default class ListHolder extends Component{
    getDraggableElms(draggablesList){
        return (
            <Fragment>
                {
                    draggablesList.map((dragElm,index)=>{
                        return (
                            <Draggable draggableId={dragElm.id} key={nanoid()} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                        <h4>{dragElm.text}</h4>
                                    </div>
                                )}
                            </Draggable>
                        )
                    })
                }
            </Fragment>
        )
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
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                                    {...provided.droppableProps}
                                    >
                                    <h2>{droppableItem.text}</h2>
                                    {this.getDraggableElms(droppableItem.draggables)}
                                    {provided.placeholder}
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
            </div>
        )
    }
}