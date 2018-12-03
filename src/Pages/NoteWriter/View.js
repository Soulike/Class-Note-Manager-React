import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import style from './NoteWriter.module.scss';
import {View as FileName} from './Components/FileName';
import {View as Editor} from './Components/Editor';
import {View as Previewer} from './Components/Previewer';
import {getAsync, localStorageGet, localStorageRemove, postAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';

class NoteWriter extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            id: -1,
            name: undefined,
            content: undefined
        };
    }


    componentDidMount()
    {

        const {id} = this.props.location.query;
        if (id !== undefined)
        {
            this.setState({id});
            getAsync(requestPrefix('/getNote'), false, {id})
                .then(res =>
                {
                    const {isSuccess, msg, data} = res;
                    if (isSuccess)
                    {
                        const {name, content} = data;
                        this.setState({
                            name,
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
        const name = localStorageGet('name');
        const content = localStorageGet('content');
        const {id} = this.state;
        postAsync(requestPrefix('/submitNote'), {
            name,
            content,
            id
        })
            .then(res =>
            {
                const {isSuccess, msg} = res;
                Alert.show(msg, isSuccess);
                if (isSuccess)
                {
                    browserHistory.push('/NoteList');
                    localStorageRemove('name');
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
        const {name, content} = this.state;
        const {location} = this.props;
        return (
            <div className={style.NoteWriter}>
                <div className={style.fileInfoArea}>
                    <FileName name={name} location={location}/>
                    <button className={style.submitButton} onClick={this.onSubmitButtonClick}>提交</button>
                </div>
                <div className={style.editorArea}>
                    <div className={style.editor}>
                        <Editor content={content} location={location}/>
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
