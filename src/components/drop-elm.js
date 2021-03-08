import {Component} from 'react';
import {Droppable } from 'react-beautiful-dnd';
import DragElm from './drag-elm';

// Helps in generating random ids
import { nanoid } from 'nanoid';

export default class DropElm extends Component{
    getDraggableElms(draggablesList){
        return (
            <div className="draggables-container">
                {
                    draggablesList.map((dragElm,index)=>{
                        return (
                            <DragElm key={nanoid()} dragData={dragElm} index={index}/>
                        )
                    })
                }
            </div>
        )
    }

    addTask = (event)=>{
        let {addTaskCallback,droppableItem} = this.props;
        addTaskCallback(droppableItem.id);
    }

    render(){
        let {droppableItem} = this.props;
        return(
            <Droppable droppableId={droppableItem.id}>
                {(provided, snapshot) => (
                    <div
                    className="droppable-holder"
                    ref={provided.innerRef}
                    style={{ backgroundColor: snapshot.isDraggingOver ? '#1d99fd' : '#ebecf0' }}
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
    }
}