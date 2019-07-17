import React from 'react';

import './app-header.css'

const AppHeader = ({todo, done}) => {
  return (
    <div className="app-header">
      <h1>ToDo List</h1>
      <h5>{todo} more todo, {done} done </h5>
    </div>
  )
};

export default AppHeader;