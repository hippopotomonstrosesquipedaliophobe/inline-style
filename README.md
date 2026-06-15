# @vvi/inline-style

一个简单的为 html 原属节点设置行内样式和移除行内样式的（两）函数

可使用自定义 css 属性

## 安装

```sh
npm install --save @vvi/inline-style
```

## 使用

设置行内样式

```ts
import { setStyle } from '@vvi/inline-style';

setStyle(document.body, {
  width: '100%',
  '--custom-width': '80%',
});
```

移除行内样式

```ts
import { removeStyle } from '@vvi/inline-style';

removeStyle(document.body, ['width', '--custom-width']);
```

属性命名请使用*小驼峰*

## 状态

此软件包是 `MrMudBean` 生态系统的一部分。
它使用严格的 TypeScript 编写，并通过 Rollup 构建进行验证。
虽然单元测试较少，但 API 稳定，并在生产环境中大量使用。
