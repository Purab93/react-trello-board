import {Component, Fragment} from 'react';
import DropElm from './drop-elm';

// Helps in generating random ids
import { nanoid } from 'nanoid'

export default class ListHolder extends Component{

    // kept additional layer incase we need to perform any functionalities 
    addList = (event)=>{
        this.props.addListCallback(event);
    }
    

    getDroppableDom(){
        let {addTaskCallback, droppableData} = this.props;
        return (
            <Fragment>
                {   
                    droppableData.map((droppableItem)=>{
                        return (
                            <DropElm addTaskCallback={addTaskCallback} droppableItem={droppableItem} key={nanoid()} />
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