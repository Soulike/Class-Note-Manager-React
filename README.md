# Class Note Manager React
### 开源软件基础大作业前端部分

#### 目前已经确定的路由
- /server/deleteNote
    - 参数 id：被删除文章 id 
- /server/getNoteList
    - 返回data格式
```js
[
    {
        id: 1,
        name: 'aaaaa',
        lastModified: Date.now() - 10000000
    },
    {
        id: 2,
        name: 'aaaaa',
        lastModified: Date.now() - 20000000
    },
    ……
]
```
- /server/getNote
    - 参数 id：要获取的笔记 id
    - 返回 data
```js
{
    title: 'string',
    content: 'HTML',
    lastModifiedDate: 'number'
}
```

- /server/noteConvert
    - 参数 markdown，markdown原文
    - 返回值 data，字符串，含有转换后的html
