import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: "",
            status: false,
        }
    }

    UNSAFE_componentWillMount = () => {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            });

        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            });

        } else if (nextProps && nextProps.task === null) {
            this.setState({
                id: '',
                name: "",
                status: false,
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            state: false,
        })
    }
    render() {
        const { id } = this.state;
        return (
            <div className="card-body">
                <div className="panel-heading">
                    <h4 className="panel-title border p-1 bg-warning bg-opacity-10">
                        {id !== '' ? "Cập nhật công việc" : "Thêm Công Việc"}
                        <span className="fa fa-times-circle text-right float-end" onClick={this.onCloseForm} />
                    </h4>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning text-white">
                            <span className="fa fa-plus me-1" />Lưu Lại
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onClear}>
                            <span className="fa fa-times me-1" />Hủy Bỏ
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default TaskForm;