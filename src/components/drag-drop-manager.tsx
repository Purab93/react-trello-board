import { useState, ReactNode } from 'react';
import DropElm from './drop-elm';
import Modal from './modal';

// Helps in generating random ids
import { nanoid } from 'nanoid'

interface ListHolderProps {
    addListCallback: (title: string) => void;
    addTaskCallback: (droppableId: string, title: string, text: string) => void;
    droppableData: any[];
    updateDragDropData: (droppableElm: any) => void;
    updateDropList: (droppableElmId: string, title: string) => void;
}

const ListHolder = (props: ListHolderProps) => {
    const [showModal, setShowModal] = useState(false);
    const { addListCallback, addTaskCallback, droppableData, updateDragDropData, updateDropList } = props;

    const toggleModalState = (event: ReactNode)=> {
        setShowModal((prevState: boolean) => !prevState);
    }

    const addList = (title: string)=>{
        addListCallback(title);
    }  

    const getDroppableDom = () => {
        return (
            <>
                {   
                    droppableData.map((droppableItem: any)=>{
                        return (
                            <DropElm updateDropList={updateDropList} updateDragData={updateDragDropData} addTaskCallback={addTaskCallback} droppableItem={droppableItem} key={nanoid()} />
                        )
                    })
                }
            </>
        )
    }


    return (
        <div className="list-holder">
            {getDroppableDom()}
            <div className="add-list-btn" onClick={toggleModalState}>+ Add Another List</div>
            {showModal?
                <Modal modalTitle='List Title' showOnlyTitle={true} show={showModal} successCallback={addList} cancelCallback={toggleModalState}/> : null
            }
        </div>
    )
}

export default ListHolder;