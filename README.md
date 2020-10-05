## 创建项目
`npx create-react-app ts-react --typescript`

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