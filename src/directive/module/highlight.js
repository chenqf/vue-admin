import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/monokai-sublime.css' 

export default el =>{
    let highlight = el.querySelectorAll('pre code');
    highlight.forEach((block)=>{
        hljs.highlightBlock(block)
    })
}