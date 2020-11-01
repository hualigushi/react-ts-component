import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'
import Button from './components/Button/button'
import Icon from './components/Icon/icon';

library.add(fas)
function App() {
  return (
    <div className="App">
      <Menu defaultIndex='0' defaultOpenSubMenus={['2']}>
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

      <Icon icon="spinner" spin />
    </div>
  );
}

export default App;
