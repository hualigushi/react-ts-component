import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
function App() {
  return (
    <div className="App">
      <Menu defaultIndex='0' mode="vertical" defaultOpenSubMenus={['2']}>
        <MenuItem>
        cool link</MenuItem>
        <MenuItem>
        cool link2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
          cool link</MenuItem>
          <MenuItem>
          cool link2</MenuItem>
          </SubMenu>
        <MenuItem>
        cool link3</MenuItem>
        <MenuItem>
        cool link4</MenuItem>
      </Menu>
     </div>
  );
}

export default App;
