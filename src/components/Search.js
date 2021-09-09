import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state={
            keyword:''
        }
    }

    onChange=(event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
        })
    }

    onSearch=()=>{
        this.props.onSearch(this.state.keyword)
    }
    
    render() {
        const {keyword}=this.state;
        return (

            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nhập từ khóa..." 
                    name="keyword" 
                    value={keyword}
                    onChange={this.onChange}
                />
                <button 
                    className="btn btn-outline-secondary"   
                    type="button"
                    onClick={this.onSearch}
                >
                    <span className="fa fa-search" />Tìm
                </button>
            </div>
        );
    }
}

export default Search;