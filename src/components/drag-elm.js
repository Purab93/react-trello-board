import {Component} from 'react';
import {Draggable } from 'react-beautiful-dnd';

export default class DragElm extends Component{
    render(){
        let {dragData,index} = this.props;
        return(
            <Draggable draggableId={dragData.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        className="draggable-holder"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                        <div className="draggable-title-holder">{dragData.title}</div>
                        <div className="draggable-content-holder">{dragData.text}</div>
                    </div>
                )}
            </Draggable>
        )
    }
}