import { useState, ReactNode } from 'react';
import {Draggable } from 'react-beautiful-dnd';
import Modal from './modal';
import { AiFillEdit } from 'react-icons/ai';

interface DragElmProps {
    index: number;
    dragData: {
        title: string,
        text: string,
        id: string,
    };
    updateDragElm: (dragData: any) => void;
}

const DragElm = (props: DragElmProps) => {
    const [showModal, setShowModal] = useState(false);
    const {dragData, index, updateDragElm} = props;

    const toggleModalState = (event: ReactNode)=> {
        setShowModal((prevState: boolean) => !prevState);
    }

    const updateElmData = (title: string, content: string) =>{
        dragData.title = title || dragData.title;
        dragData.text = content || dragData.text;
        updateDragElm(dragData);
    }

    return(
        <>
            <Draggable draggableId={dragData.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        className="draggable-holder"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                        <div className="edit-icon-btn" onClick={toggleModalState}>
                            <AiFillEdit />
                        </div>
                        <div className="draggable-title-holder">{dragData.title}</div>
                        <div className="draggable-content-holder">{dragData.text}</div>
                    </div>
                )}
            </Draggable>
            {showModal?
                <Modal title={dragData.title} content={dragData.text} show={showModal} successCallback={updateElmData} cancelCallback={toggleModalState}/>:<></>}
        </>
    )
}

export default DragElm;