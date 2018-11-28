import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import style from './NoteWriter.module.scss';
import {View as FileName} from './Components/FileName';
import {View as Editor} from './Components/Editor';
import {View as Previewer} from './Components/Previewer';
import {getAsync, localStorageGet, localStorageRemove, postAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';
import {checkSession} from '../Login/Functions';

class NoteWriter extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            noteId: -1,
            title: undefined,
            content: undefined
        };
    }


    componentDidMount()
    {
        checkSession();
        const {noteId} = this.props.location.query;
        if (noteId !== undefined)
        {
            this.setState({noteId});
            getAsync(requestPrefix('/getNote'), false, {id: noteId})
                .then(res =>
                {
                    const {isSuccess, msg, data} = res;
                    if (isSuccess)
                    {
                        const {title, content} = data;
                        this.setState({
                            title,
                            content
                        });
                    }
                    else
                    {
                        Alert.show(msg, false);
                    }
                })
                .catch(e =>
                {
                    Alert.show('获取笔记内容失败');
                    setTimeout(() =>
                            browserHistory.push('/NoteList'),
                        1000);
                    console.log(e);
                });
        }
    }

    onSubmitButtonClick = e =>
    {
        e.preventDefault();
        const fileName = localStorageGet('fileName');
        const content = localStorageGet('content');
        const {noteId} = this.state;
        postAsync(requestPrefix('/submitNote'), {
            fileName,
            content,
            noteId
        })
            .then(res =>
            {
                const {isSuccess, msg} = res;
                Alert.show(msg, isSuccess);
                if (isSuccess)
                {
                    browserHistory.push('/NoteList');
                    localStorageRemove('fileName');
                    localStorageRemove('content');
                }
            })
            .catch(e =>
            {
                Alert.show('笔记提交失败', false);
                console.log(e);
            });
    };


    render()
    {
        const {title, content} = this.state;
        return (
            <div className={style.NoteWriter}>
                <div className={style.fileInfoArea}>
                    <FileName title={title}/>
                    <button className={style.submitButton} onClick={this.onSubmitButtonClick}>提交</button>
                </div>
                <div className={style.editorArea}>
                    <div className={style.editor}>
                        <Editor content={content}/>
                    </div>
                    <div className={style.previewer}>
                        <Previewer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteWriter;
