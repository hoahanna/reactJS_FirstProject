/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class Sort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: 'name',
                value: 1,
            }
        }
    }

    toggleDropdown = (event) => {
        const elm = document.querySelector('.search-list');
        const items = document.querySelectorAll('.dropdown-item');

        elm.classList.toggle('not-hidden');

        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                elm.classList.remove('not-hidden');
            })
        })
    }

    // ham setState la ham bat dong bo

    onClick = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            },
        }, () => {
            // console.log(this.state)
            this.props.onSort(this.state.sort)
        });

    }

    render() {
        const { sort } = this.state;
        return (
            <div>
                <button className="btn btn-outline-secondary dropdown-toggle text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={this.toggleDropdown}>Sắp xếp</button>
                <ul className="dropdown-menu dropdown-menu-end search-list">
                    <li>
                        <a onClick={() => { this.onClick('name', 1) }}
                            className={sort.by === 'name' && sort.value === 1 ? 'dropdown-item sort_selected' : 'dropdown-item'}
                        >
                            A đến Z
                        </a>
                    </li>
                    <li>
                        <a onClick={() => { this.onClick('name', -1) }}
                            className={sort.by === 'name' && sort.value === -1 ? 'dropdown-item sort_selected' : 'dropdown-item'}
                        >
                            Z đến A
                        </a>
                    </li>
                    <li>
                        <a onClick={() => { this.onClick('status', 1) }}
                            className={sort.by === 'status' && sort.value === 1 ? 'dropdown-item sort_selected' : 'dropdown-item'}
                        >
                            Ẩn đến hoạt động
                        </a>
                    </li>
                    <li>
                        <a onClick={() => { this.onClick('status', -1) }}
                            className={sort.by === 'status' && sort.value === -1 ? 'dropdown-item sort_selected' : 'dropdown-item'}
                        >
                            Ẩn đến hoạt động
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider"
                        />
                    </li>
                    <li>
                        <a className="dropdown-item">Mặc định</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sort;