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
```js
import { useEffect, useState } from 'react'

function useDebounce(value: any, delay = 300) {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return debounceValue
}

export default useDebounce
```

## 自定义hook键盘时间
```js
import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current?.contains(event.target as HTMLElement)) {
                return
            }
            handler(event)
        }
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [ref, handler])
}

export default useClickOutside
```

## hooks useState functional update 使用Object.is算法，可使用自定义方法更新值

## 元素拖动事件 onDragOver onDragLeave onDrop

## 组件库模块打包，打包成ES6 modules

1. 创建组件库入口文件, 导入所有组件

```js
src/components/Button/index.tsx

import Button from './button'
export default Button 
```


```js
src/index.tsx

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export { default as Button } from './components/Button'
export { default as Menu } from './components/Menu'
export { default as AutoComplete } from './components/AutoComplete'
export { default as Icon } from './components/Icon'
export { default as Input } from './components/Input'
export { default as Progress } from './components/Progress'
export { default as Transition } from './components/Transition'
export { default as Upload } from './components/Upload'
```

2. tsconfig.build.json 专门用于模块打包
tsc将tsx文件转成js文件

```
{
    "compilerOptions": {
      "outDir": "dist", // 编译好的文件存放的位置
      "module": "esnext",
      "target": "es5", // 编译好的文件符合什么标准
      "declaration": true, // 为每个ts文件生成 .d.ts文件
      "jsx": "react",
      "moduleResolution":"Node",
      "allowSyntheticDefaultImports": true,
    },
    "include": [
      "src"
    ],
    "exclude": [
      "src/**/*.test.tsx",
      "src/**/*.stories.tsx",
      "src/setupTests.ts",
    ]
  }
```

3. 打包脚本

```
package.json

scripts: {
 "clean": "rimraf ./dist",
 "build": "npm run clean && npm run build-ts && npm run build-css",
 "build-ts": "tsc -p tsconfig.build.json",
 "build-css": "node-sass ./src/styles/index.scss ./dist/index.css",
}
```

## 发布组件库到npm

```
package.json

{
  "name": "vikingship",
  "version": "0.1.4",
  "description": "React components library",
  "author": "Money",
  "private": false,
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "license": "MIT",
  "keywords": [
    "Component",
    "UI",
    "React"
  ],
  "homepage": "http://money.xyz",
  "repository": {
    "type": "git",
    "url": "https://github.com/vikingmute/vikingship"
  },
  "files": [
    "dist"
  ],
  scripts:{
    "prepublishOnly": "npm run test:nowatch && npm run lint && npm run build"
  }
}
```
发布命令   `npm publish`

## 核心依赖库声明

```
package.json

"peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
```

## 保证代码质量：发布和commit前检查

`npm install husky -D`

```
package.json

"scripts":{
  "lint": "eslint --ext js,ts,tsx src --max-warnings 5",
  "test:nowatch": "cross-env CI=true react-scripts test",
  "prepublishOnly": "npm run test:nowatch && npm run lint && npm run build"
},
"husky": {
    "hooks": {
      "pre-commit": "npm run test:nowatch && npm run lint"
    }
  },
```

## 使用storybook生成静态文档页面

1. 新建欢迎页 `src/welcome.stories.tsx`

2. 设置欢迎页为默认页

```
.storybook/preview.tsx

const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);
```

3. 运行命令 `build-storybook`