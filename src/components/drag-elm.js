import { Fragment } from 'react';
import {Component} from 'react';
import {Draggable } from 'react-beautiful-dnd';
import Modal from './modal';
import { AiFillEdit } from 'react-icons/ai';


export default class DragElm extends Component{
    constructor(props){
        super(props);
        this.state ={
            showModal: false
        }
    }

    toggleModalState = (event)=> {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    updateElmData = (title, content) =>{
        let {updateDragElm, dragData} = this.props;
        dragData.title = title || dragData.title;
        dragData.text = content || dragData.text;
        updateDragElm(dragData);
    }

    render(){
        let {dragData,index} = this.props;
        return(
            <Fragment>
                <Draggable draggableId={dragData.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                            className="draggable-holder"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                            <div className="edit-icon-btn" onClick={this.toggleModalState}>
                                <AiFillEdit />
                            </div>
                            <div className="draggable-title-holder">{dragData.title}</div>
                            <div className="draggable-content-holder">{dragData.text}</div>
                        </div>
                    )}
                </Draggable>
                {this.state.showModal?
                    <Modal title={dragData.title} content={dragData.text} show={this.state.showModal} successCallback={this.updateElmData} cancelCallback={this.toggleModalState}/>:<></>}
            </Fragment>
        )
    }
}