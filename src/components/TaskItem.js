import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate=()=>{
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        const { task, index } = this.props;
        return (
            <tr>
                <th scope="row">{index}</th>
                <td>{task.name}</td>
                <td>
                    <button
                        type="button"
                        className={task.status === true ? "btn btn-danger text-white" : "btn btn-success text-white"}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? "Kích hoạt" : "Ẩn"}
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-warning text-white" onClick={this.onUpdate}>
                        <span className="fa fa-pencil-alt mr-5 " />Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5" />Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;