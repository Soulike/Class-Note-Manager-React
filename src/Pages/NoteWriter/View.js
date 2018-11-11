import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import style from './NoteWriter.module.scss';
import {View as FileName} from './Components/FileName';
import {View as Editor} from './Components/Editor';
import {View as Previewer} from './Components/Previewer';
import {localStorageGet, postAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';

class NoteWriter extends Component
{
    constructor()
    {
        super(...arguments);
        this.setState({
            noteId: -1
        });
    }


    componentDidMount()
    {
        const {noteId} = this.props.location.query;
        if (noteId !== undefined)
        {
            this.setState({noteId});
        }
    }

    onSubmitButtonClick = e =>
    {
        const noteContent = localStorageGet('noteContent');
        const {noteId} = this.state;
        postAsync(requestPrefix('/submitNote'), {
            noteContent,
            noteId
        })
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                Alert.show(msg, isSuccess);
                browserHistory.push('/');
            })
            .catch(e =>
            {
                Alert.show('笔记提交失败', false);
                console.log(e);
            });
    };


    render()
    {
        return (
            <div className={style.NoteWriter}>
                <div className={style.fileInfoArea}>
                    <FileName/>
                    <button className={style.submitButton} onClick={this.onSubmitButtonClick}>提交</button>
                </div>
                <div className={style.editorArea}>
                    <div className={style.editor}>
                        <Editor/>
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
