/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditting: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1,
      }
    }
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({ tasks: tasks })
    }
  }


  genarateData = () => {
    const tasks = [
      {
        id: this.genarateID(),
        name: 'Hoc lap trinh',
        status: true
      },
      {
        id: this.genarateID(),
        name: 'Choi game',
        status: false
      },
      {
        id: this.genarateID(),
        name: 'Nau an',
        status: true
      }
    ]
    this.setState({ tasks: tasks })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  randomString() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  genarateID() {
    return this.randomString() + ('-') + this.randomString() + ('-') + this.randomString() + ('-') + this.randomString()
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditting !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditting: null
      })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditting: null
      })
    }

  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditting: null
    })
  }

  onShowForm = () => {
    this.setState({ isDisplayForm: true })
  }

  onSubmit = (data) => {
    let task = {};
    const { tasks } = this.state;
    if (data.id === '') {
      task = {
        id: this.genarateID(),
        name: data.name,
        status: Boolean(data.status),
      }
      tasks.push(task);
    } else {
      const index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditting: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    const index = this.findIndex(id);
    const { tasks } = this.state;
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({ tasks: tasks });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  findIndex = (id) => {
    const { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) result = index;
    })
    return result;
  }

  onDelete = (id) => {
    const index = this.findIndex(id);
    const { tasks } = this.state;
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({ tasks: tasks });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    const index = this.findIndex(id);
    const { tasks } = this.state;
    const taskEditting = tasks[index];

    this.setState({ taskEditting: taskEditting }, () => {

      console.log(this.state.taskEditting);
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    console.log(filterName + filterStatus);
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus,
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }

  onSort = (sort) => {
    this.setState({
      sort: {
        by: sort.by,
        value: sort.value
      }
    }, () => {
      console.log(this.state.sort)
    })

  }

  render() {
    let { tasks, isDisplayForm, taskEditting, filter, keyword, sort } = this.state;

    // filter
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
        })
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      })
    }

    // search
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      })
    }

    // sort
    if(sort.by==='name'){
      tasks.sort((a,b) => {
        if(a.name>b.name) return sort.value;
        else if(a.name<b.name) return -sort.value;
        else return 0;
      })
    }else{
      tasks.sort((a,b) => {
        if(a.status>b.status) return sort.value;
        else if(a.status<b.status) return -sort.value;
        else return 0;
      })
    }
    

    const elmTaskForm = isDisplayForm ? <TaskForm
      onCloseForm={this.onCloseForm}
      onSubmit={this.onSubmit}
      task={taskEditting}
    /> : "";

    return (
      <div className="container">
        <h1 className="text-center">Quản Lý Công Việc</h1>
        <div className="row">
          <div className={isDisplayForm ? "col col-xs-4 col-sm-4 col-md-4 col-lg-4" : "col col-xs-0 col-sm-0 col-md-0 col-lg-0"}>
            <div className="card">
              {elmTaskForm}
            </div>
          </div>
          <div className={isDisplayForm ? "col col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <div className="card">
              <div className="card-body">
                <div className="panel-heading">
                  <h5 className="panel-title bg-primary text-white"
                    style={{ width: 200, borderRadius: 5, padding: 5, cursor: "pointer" }}
                    onClick={this.onToggleForm}
                  >
                    <span className="fa fa-plus me-1" />
                    Thêm Công Việc
                  </h5>
                  <h5 className="panel-title bg-danger text-white"
                    style={{ width: 200, borderRadius: 5, padding: 5, cursor: "pointer" }}
                    onClick={this.genarateData}
                  >
                    <span className="fa fa-plus me-1" />
                    Tạo mới dữ liệu
                  </h5>
                </div>

                <Control onSearch={this.onSearch} onSort={this.onSort} />
                <TaskList tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

