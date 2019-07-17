import React, {Component} from 'react';

import './search-panel.css'

export default class SearchPanel extends Component {

  state = {
    term: ''
  }

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({term});
    this.props.onSearchChange(term);
  };
  
  render() {
    const SearchText = 'Type here to search '
    return (
      <input
        className="search-panel" placeholder={ SearchText }
        onChange={this.onSearchChange}
        value={this.state.term}
      ></input>
    )
  }
}
