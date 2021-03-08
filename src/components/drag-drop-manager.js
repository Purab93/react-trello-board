import {Component, Fragment} from 'react';
import DropElm from './drop-elm';
import Modal from './modal';

// Helps in generating random ids
import { nanoid } from 'nanoid'

export default class ListHolder extends Component{
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

    addList = (title)=>{
        this.props.addListCallback(title);
    }  

    getDroppableDom(){
        let {addTaskCallback, droppableData, updateDragDropData,updateDropList} = this.props;
        return (
            <Fragment>
                {   
                    droppableData.map((droppableItem)=>{
                        return (
                            <DropElm updateDropList={updateDropList} updateDragData={updateDragDropData} addTaskCallback={addTaskCallback} droppableItem={droppableItem} key={nanoid()} />
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
                <div className="add-list-btn" onClick={this.toggleModalState}>+ Add Another List</div>
                {this.state.showModal?
                    <Modal modalTitle='List Title' showOnlyTitle={true} show={this.state.showModal} successCallback={this.addList} cancelCallback={this.toggleModalState}/>:<Fragment />
                }
            </div>
        )
    }
}