# chill-schema-form

## Development

```
yarn prepare or lerna bootstrap
```

**为什么使用pnpm workspace而不是yarn workspace管理依赖？**

前提：
demo分别用到了vue2和vue3，用vite搭建，vue2同时需要安装vue-template-compiler

使用yarn workspace安装完成后，依赖关系如下：

```
node_modules
| +---vue@3.1.5
| +---vue-template-compiler
...
packages
|  ├─demo
|  |  ├─vue2
|  |  │  ├─node_modules
|  |  │  │  ├─.bin
|  |  │  │  └─vue@2.6.14
|  |  │  ├─public
|  |  │  └─src
|  |  │      ├─assets
|  |  │      └─components
|  |  └─vue3
|  |     ├─node_modules
|  |     │  └─.bin
|  |     ├─public
|  |     └─src
|  |        ├─assets
|  |        └─components
```

启动vue2demo的时候，报错

```
Vue packages version mismatch:

- vue@3.1.5 (D:\workspace\chill-schema-form\node_modules\vue\index.js)
- vue-template-compiler@2.6.14 (D:\workspace\chill-schema-form\node_modules\vue-template-compiler\package.json)
```

因为vue-template-compiler和vue@3.x都被提升到了顶层，vue-template-compiler引用vue的时候，引用到了同级目录下的vue，导致报错

使用pnpm workspace安装完成后，依赖关系如下:

```
packages
|  ├─demo
|  |  ├─vue2
|  |  │  ├─node_modules
|  |  │  │  ├─.bin
|  |  │  │  └─vue@2.6.14
|  |  │  │  └─vue-template-compiler@2.6.14
|  |  │  ├─public
|  |  │  └─src
|  |  │      ├─assets
|  |  │      └─components
|  |  └─vue3
|  |     ├─node_modules
|  |     │  └─.bin
|  |  │  │  └─vue@3.1.5
|  |     ├─public
|  |     └─src
|  |        ├─assets
|  |        └─components
```
pnpm使用软连接复用相同版本的 Package，对于不同版本的package，会安装在相应的目录下，解决了重复安装相同版本的包导致的磁盘占用问题，同时也能保证包版本引用的正确性