import React, {Component}  from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item/add-item';

import './app.css'

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make awesome app'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all' // all, active, done
  };

  createTodoItem (label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const index = todoData.findIndex( (el) => el.id === id);
      console.log(index)
      const newArr = [...todoData.slice(0,index), ...todoData.slice(index+1)];
      return {
        todoData: newArr
      };
    });
  };
  
  addItem = (text) => {
    console.log("Add Item", text)
    
    const newItem = this.createTodoItem(text);
    
    this.setState(({todoData}) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  };

  toggleProperty (arr, id, propName) {
    const index = arr.findIndex( (el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [...arr.slice(0,index),
       newItem,
        ...arr.slice(index+1)]
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  searchElement = (elem) => {
    console.log("Search Elem", elem)
    this.setState(({todoData}) => {
    const newArr = todoData.filter(data => data.label[0] === elem);
      return {
        todoData: newArr
      };
    });
  }

  onSearchChange = (term) => {
    this.setState({term});
  }

  onFilterChange = (filter) => {
    this.setState({filter});
  }

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'done':
        return items.filter((item) => item.done);
      case 'active':
        return items.filter((item) => !item.done);  
      default:
        return items; 
    } 

  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term),filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="container to-do-app">
        <AppHeader todo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={ this.onSearchChange }/>
          <ItemStatusFilter
           filter={filter}
           onFilterChange = { this.onFilterChange }/>
        </div>
        <TodoList todos={ visibleItems }
        onDeleted={ this.deleteItem }
        onToggleDone = {this.onToggleDone}
        onToggleImportant = {this.onToggleImportant}
        />
        <AddItem 
        onItemAdded={ this.addItem } />
      </div>
    );
  }
};


