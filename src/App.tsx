import React from 'react';
import Button,{ButtonType,ButtonSize} from './components/Button/button'
function App() {
  return (
    <div className="App">
      <Button autoFocus>Hello</Button>
      <Button disabled={true}>Disabled Button</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com">Baidu Link</Button>
      <Button disabled={true} btnType={ButtonType.Link} href="www.baidu.com">Disabled Link</Button>
    </div>
  );
}

export default App;
