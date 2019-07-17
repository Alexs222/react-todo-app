import React, {Component} from 'react';

import './add-item.css'

export default class AddItem extends Component {
  state =  {
    label: ''
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    return (
      <form className="add-item"
      onSubmit={this.onSubmit}>
        <input className='search-panel' 
          placeholder="Введите текст"
          onChange={this.onLabelChange}
          value={this.state.label}
        ></input>
        {/* <p className='text-for-add-item'>Add Item</p> */}
        <button type="submit"
            className="add-item-button btn btn-outline-success btn-sm float-right"
            >
            Добавить
          </button>
      </form>
    )
  }
}

