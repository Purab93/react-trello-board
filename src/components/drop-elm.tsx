import { useState, ReactNode} from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DragElm from './drag-elm';
import Modal from './modal';
import { AiFillEdit } from 'react-icons/ai';

// Helps in generating random ids
import { nanoid } from 'nanoid';

export interface DraggableDataType {
    id: string;
    title: string;
    text: string;
}

export interface DroppableDataType {
    id: string;
    title: string;
    draggables: DraggableDataType[];
}

interface DropElmProps {
    droppableItem: DroppableDataType;
    addTaskCallback: (droppableId: string, title: string, content: string) => void;
    updateDropList: (droppableId: string, title: string) => void;
    updateDragData: (newDroppableItem: DroppableDataType) => void;
}

const DropElm = (props: DropElmProps) => {
    const { droppableItem, addTaskCallback, updateDropList, updateDragData } = props;
    const [showModal, setShowModal] = useState(false);
    const [showEditListModal, setShowEditListModal] = useState(false);
    const {id: droppableId, title: droppableTitle, draggables} = droppableItem;

    const getDraggableElms = (draggablesList: any[]) => {
        return (
            <div className="draggables-container">
                {
                    draggablesList.map((dragElm: any,index: number)=>{
                        return (
                            <DragElm key={nanoid()} dragData={dragElm} index={index} updateDragElm={updateDragElm}/>
                        )
                    })
                }
            </div>
        );
    }
    

    const updateDragElm = (dragData: any) => {
        const newDroppableItem: DroppableDataType= {...droppableItem};
            
        newDroppableItem.draggables = newDroppableItem.draggables.map((dragElm: any)=>{
            if(dragElm.id === dragData.id){
                return dragData;
            }
            return dragElm;
        });
        updateDragData(newDroppableItem);
    }

    const toggleModalState = (event: ReactNode)=> {
        setShowModal((prevState: boolean) => !prevState)
    }
    
    const toggleEditListModalState = (event: ReactNode)=> {
        setShowEditListModal((prevState: boolean) => !prevState);
    }

    const addTask = (title: string, content: string)=>{
        addTaskCallback(droppableId,title, content);
    }

    const updateListName = (title: string)=>{
        updateDropList(droppableId,title);
    }

    return(
        <>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        className="droppable-holder"
                        ref={provided.innerRef}
                        style={{ backgroundColor: snapshot.isDraggingOver ? '#1d99fd' : '#ebecf0' }}
                        {...provided.droppableProps}
                    >
                        <div className="edit-icon-btn" onClick={toggleEditListModalState}>
                            <AiFillEdit />
                        </div>
                        <div className="droppable-title-holder">
                            {droppableTitle}
                        </div>
                        {getDraggableElms(draggables)}
                        {provided.placeholder}
                        <div className="add-draggable-btn" onClick={toggleModalState}>+ Add Another Card</div>
                    </div>
                )}
            </Droppable>
            {showEditListModal?
                <Modal modalTitle='List Title' showOnlyTitle={true} title={droppableTitle} show={showEditListModal} successCallback={updateListName} cancelCallback={toggleEditListModalState}/> : null
            }
            {showModal?
                <Modal show={showModal} successCallback={addTask} cancelCallback={toggleModalState}/> : null
            }
        </>
    );
}

export default DropElm;