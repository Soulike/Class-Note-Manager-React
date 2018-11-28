# Class Note Manager React

## 目前已经确定的路由

### /server/login

- 类型 POST
- 参数 username
- 参数 password，是输入 password 的 sha256

### /server/signUp

- 类型 POST
- 参数 username
- 参数 password，是输入 password 的 sha256

### /server/deleteNote

- 类型 POST
- 参数 id：被删除文章 id 

### /server/getNoteList

- 类型 GET
- 返回data格式
```js
[
    {
        id: 1,
        name: 'aaaaa',
        lastModifyTime: Date.now() - 10000000
    },
    {
        id: 2,
        name: 'aaaaa',
        lastModifyTime: Date.now() - 20000000
    },
    ……
]
```

### /server/getNote

- 类型 GET
- 参数 id：要获取的笔记 id
- 返回 data
```js
{
    title: 'string',
    content: 'markdown',
    lastModifyTime: 'number'
}
```

### /server/submitNote

- 类型 POST
- 参数 content，markdown 原文
- 参数 noteId，如果是-1代表是新笔记，如果不是-1代表在原来基础上修改
- 参数 fileName，笔记的名字 

### /server/validSession

- 类型 GET
- 功能：验证 Session 是否有效