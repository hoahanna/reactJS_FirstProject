/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
    render() {
        return (
            <div className="mb-3">
                <Search onSearch={this.props.onSearch} />
                <Sort 
                    onSort={this.props.onSort} 
                    sort={this.props.sort}
                />
            </div>
        );
    }
}

export default Control;