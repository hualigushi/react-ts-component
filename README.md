## 创建项目
`npx create-react-app ts-react --typescript`

## 启动项目
`npm run start`
`npm run storybook`
`npm run test`
`npm test -- -t "auto"`

## 开启es-lint

根目录下创建 `.vscode/setting.json`
```
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ]
}
```

## 样式系统文件结构
```
styles/
  _variables.scss(各种变量以及可配置设置)
  _reboot.scss(基础样式重置)
  _mixins.scss(全局 mixins)
  _functions.scss(全局 functions)
Components/
  Button/
    style.scss(组件单独的样式)
```

## 图标库
```
@fortawesome/fontawesome-svg-core
@fortawesome/free-solid-svg-icons
@fortawesome/react-fontawesome
```

## 动画库
```
react-transition-group
@types/react-transition-group
```
重点：**unmountOnExit**
```
import { CSSTransition } from 'react-transition-group'

<CSSTransition 
  in={menuOpen} 
  timeout={300} 
  unmountOnExit={true}
  classNames="zoom-in-top" 
  appear>
  <ul className={subMenuClasses}>
      {childrenComponent}
  </ul>
</CSSTransition>
```

```
@mixin zoom-animation(
    $direction: 'top',
    $scaleStart: scaleY(0),
    $scaleEnd: scaleY(1),
    $origin: center top,
  ) {
    .zoom-in-#{$direction}-enter {
      opacity: 0;
      transform: $scaleStart;
    }
    .zoom-in-#{$direction}-enter-active {
      opacity: 1;
      transform: $scaleEnd;
      transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
      transform-origin: $origin
    }
    .zoom-in-#{$direction}-exit {
      opacity: 1;
    }
    .zoom-in-#{$direction}-exit-active {
      opacity: 0;
      transform: $scaleStart;
      transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
      transform-origin: $origin;
    }
  }

@include zoom-animation("top", scaleY(0), scaleY(1), center top);
@include zoom-animation("left", scale(0.45, 0.45), scale(1, 1), top left);
@include zoom-animation("right", scale(0.45, 0.45), scale(1, 1), top right);
@include zoom-animation("bottom", scaleY(0), scaleY(1), center bottom);

```

## Storybook
`npx -p @storybook/cli sb init`

文档
`npm i -D @storybook/addon-info`
`npm i --save @types/storybook__addon-info`

## Input 组件非受控组件处理
```js
const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
        return ''
    }
    return value

}

if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
}
```

## 自定义hook防抖

## 自定义hook键盘时间

## keyCode' is deprecated