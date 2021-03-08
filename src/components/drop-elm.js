import {Component, Fragment} from 'react';
import {Droppable } from 'react-beautiful-dnd';
import DragElm from './drag-elm';
import Modal from './modal';
import { AiFillEdit } from 'react-icons/ai';

// Helps in generating random ids
import { nanoid } from 'nanoid';

export default class DropElm extends Component{

    constructor(props){
        super(props);
        this.state ={
            showModal: false,
            showEditListModal: false
        }
    }
    
    getDraggableElms(draggablesList){
        return (
            <div className="draggables-container">
                {
                    draggablesList.map((dragElm,index)=>{
                        return (
                            <DragElm key={nanoid()} dragData={dragElm} index={index} updateDragElm={this.updateDragElm}/>
                        )
                    })
                }
            </div>
        )
    }

    updateDragElm = (dragData) =>{
        let {droppableItem,updateDragData} = this.props,
            newDroppableItem = {...droppableItem};
            
        newDroppableItem.draggables = newDroppableItem.draggables.map((dragElm)=>{
            if(dragElm.id === dragData.id){
                return dragData;
            }
            return dragElm;
        });
        updateDragData(newDroppableItem);
    }

    toggleModalState = (event)=> {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    
    toggleEditListModalState = (event)=> {
        this.setState({
            showEditListModal: !this.state.showEditListModal
        })
    }

    addTask = (title, content)=>{
        let {addTaskCallback,droppableItem} = this.props;
        addTaskCallback(droppableItem.id,title, content);
    }

    updateListName = (title)=>{
        let {droppableItem,updateDropList} = this.props
        updateDropList(droppableItem.id,title);
    }

    render(){
        let {droppableItem} = this.props;
        return(
            <Fragment>
                <Droppable droppableId={droppableItem.id}>
                    {(provided, snapshot) => (
                        <div
                            className="droppable-holder"
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? '#1d99fd' : '#ebecf0' }}
                            {...provided.droppableProps}
                        >
                            <div className="edit-icon-btn" onClick={this.toggleEditListModalState}>
                                <AiFillEdit />
                            </div>
                            <div className="droppable-title-holder">
                                {droppableItem.title}
                            </div>
                            {this.getDraggableElms(droppableItem.draggables)}
                            {provided.placeholder}
                            <div className="add-draggable-btn" onClick={this.toggleModalState}>+ Add Another Card</div>
                        </div>
                    )}
                </Droppable>
                {this.state.showEditListModal?
                    <Modal modalTitle='List Title' showOnlyTitle={true} title={droppableItem.title} show={this.state.showEditListModal} successCallback={this.updateListName} cancelCallback={this.toggleEditListModalState}/>:<Fragment />
                }
                {this.state.showModal?
                    <Modal show={this.state.showModal} successCallback={this.addTask} cancelCallback={this.toggleModalState}/>:<Fragment />
                }
            </Fragment>
        )
    }
}