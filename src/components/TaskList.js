/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import TaskItem from './TaskItem';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1,
        }
    }

    toggleDropdown = (event) => {
        const elm = document.querySelector('.status-list');
        const items = document.querySelectorAll('.dropdown-item');

        elm.classList.toggle('not-hidden');

        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                elm.classList.remove('not-hidden');
            })
        })
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        );

        this.setState({
            [name]: value,
        });

    }

    render() {

        const { tasks } = this.props;
        const { filterName, filterStatus } = this.state;
        const elmTasks = tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                task={task}
                index={index}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
            />;
        })

        return (
            <div>
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="filterName"
                                    value={filterName}
                                    onChange={this.onChange}
                                />
                            </td>
                            <td>
                                <select className="form-control"
                                    name="filterStatus"
                                    value={filterStatus}
                                    onChange={this.onChange}
                                >
                                    <option value={-1}>Tất cả</option>
                                    <option value={0}>Ẩn</option>
                                    <option value={1}>Kích hoạt</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>

                        {elmTasks}

                    </tbody>
                </table>

            </div>
        );
    }
}

export default TaskList;