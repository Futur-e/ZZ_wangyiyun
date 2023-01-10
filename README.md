# 仿照方网易云

## 搭建运行环境
```
安装项目所需要依赖：npm install
运行项目：npm run serve
```
##  简介
模仿网易云pc端，由于登录接口一直没有修复，大部分功能不能实现，只做了一部分不需要登录也可以实现的功能，后续接口修复继续完善。
##  笔记
## iconPark组件库的引用（网易云项目图标使用）

> 该实例可以使用到全局组件的注册

实例网站：https://juejin.cn/post/7012145094216122399

安装：**npm install @icon-park/vue-next**.

main.js中引用：

```
import { IconPark } from '@/utils/iconPark'
IconPark(app)
```

babel.config.js 中引用：

```
pligins:[
    'import',
  {
    libraryName:'@icon-park/vue-next',
    libraryDirectory:'es/icons',
    camel2DashComponentName:false
  },
    'icon'
]
```

首先将其单独存放在一个文件js中（避免main.js 中引用太多）

```
import { Play } from '@icon-park/vue-next'
export function IconPark (app) {
    app.component('iconPlay', Play)
}
```

## vue3的组件全局注册

将改内容放到全局组件的文件夹下，最后引入改文件到mian.js

```
import ui from './components/library'  //引入library中全局组件
app.use(ui)
```

```
// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
export default {
    install (app) {
        // 在app上进行扩展，app提供 component directive 函数
        // 如果要挂载原型 app.config.globalProperties 方式
        // app.component(XtxSkeleton.name, XtxSkeleton)
        
        
        // 批量注册全局组件
        importFn.keys().forEach(key => {
            // 导入组件
            const component = importFn(key).default
            // 注册组件
            app.component(component.name, component)
        })
    }
}
```

自定义播放组件控制audio标签

```
<audio ref="divRef" :src="store.state.url" autoplay
        @play="changePlay(true)"
       @pause="changePlay(false)"
></audio>
```

audio组件：play播放回调，pause暂停回调，ref是为了通过获取audio标签从而获取audio上正在播放的歌曲信息。从而在自定义播放器上简介调用

![1673332841331](C:\Users\张张\AppData\Roaming\Typora\typora-user-images\1673332841331.png)

![1673332983299](C:\Users\张张\AppData\Roaming\Typora\typora-user-images\1673332983299.png)

duration是获取当前歌曲的总时长；currentTime获取当前播放的时间点，volume修改音量的变量

由于接口返回的数据变量名不同导致组件不能够复用，使用以下方法解决

![1673331061944](C:\Users\张张\AppData\Roaming\Typora\typora-user-images\1673331061944.png)

#### 注意点

1、如果需要watch在vuex仓库中的数据，需要首先通过计算属性获取。

2、遍历接口获得的数据，可以得到遍历的数据，但是对其操作的时候就会无法获取遍历到的值，可以通过事先遍历的到的值用es6语法结构出来就可以解决（在复用组件的时候遇到的问题recommend.vue）

