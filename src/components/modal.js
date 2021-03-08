import React from 'react';
import { Fragment } from 'react';
import { Modal, Button, Alert} from 'react-bootstrap';

export default class EnquiryModal extends React.Component {
    constructor(props) {
        super(props);
        let {modalTitle,showOnlyTitle,title,content} = this.props;
        this.state = {
            show: this.props.show || false,
            showOnlyTitle: showOnlyTitle || false,
            modalTitle: modalTitle || 'Task Details',
            title: title || '',
            content: content || '',
            showError: false
        };
    }

    handleClose = ()=> {
        this.setState({ show: false });
        this.props.cancelCallback();
    }

    handleShow = ()=> {
        this.setState({ show: true });
    }

    updateTitle = (event) =>{
        this.setState({
            title: event.target.value,
            showError: event.target.value?false:true
        });
    }

    updateContent = (event) =>{
        this.setState({
            content: event.target.value
        });
    }

    toggleError = () => {
        this.setState({
            showError: !this.state.title
        });
    }

    saveData = () => {
        let {title,content} = this.state;
        if(!title){
            this.toggleError();
            return true;
        }
        this.props.successCallback(title,content);
        this.handleClose();
    }

    render() {
        let {modalTitle,show,showOnlyTitle,title,content,showError} = this.state;
        return (
            <Modal
                centered
                size="lg"
                show={show}
                onHide={this.handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showError?
                    <Alert variant='danger'>Please Add Title</Alert>:<Fragment/>}
                    <div className="add-edit-form row form-input-holder">
                        <div className="input-group col-md-12">
                            <input type="text" className="form-control" placeholder="Title" name="title" value={title} onChange={this.updateTitle} />
                        </div>
                    </div>
                    {!showOnlyTitle?
                        <div className="add-edit-form row form-input-holder">
                            <div className="input-group col-md-12">
                                <textarea className="form-control" placeholder="Content" name="content" value={content} onChange={this.updateContent} />
                            </div>
                        </div>:<Fragment />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.saveData}>
                        Save
                    </Button>
                    <Button variant="fail" onClick={this.handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}