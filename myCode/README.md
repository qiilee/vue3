# vue3
> win10全局安装vue脚手架: npm i -g @vue/cli安装失败，cnpm i -g @vue/cli安装成功
> mac安装时，命令前面加上sudo

| 名称 | 简介 | 备注 |
| ---- | ---- | ---- |
| mydemo | 选择的Default ([Vue 2] babel, eslint) | 运行成功，由命令vue create mydemo创建，windows系统使用Git Bash 上下箭头不管用，建议使用cmd.exe | 
| mydemo01 | 选择的Default (Vue 3 Preview) ([Vue 3] babel, eslint) | 运行成功 | 
| mydemo02 | 选择的Manually select features | 具体看mydemo02.png，运行成功| 项目中的demo来源自[文章](https://segmentfault.com/a/1190000038236423?utm_source=tag-newest),还没完成！ | 
| mydemo03 | 选择的Manually select features | 比mydemo02多选了typescript、vuex | 运行成功 | 


> create-vue替代了vue-cli，是Vue官方新的脚手架工具，底层由webpack切换到了vite（下一代前端工具链），为开发提供极速响应，Vite 是 Vue 团队打造的一款极速构建工具。
> node版本>=16
> npm init vue@latest，这一指令会安装并执行create-vue

| 名称 | 简介 | 备注 |
| ---- | ---- | ---- |
| vue-project | npm init vue@latest脚手架创建 | 运行成功，详见vue-project.jpg | 