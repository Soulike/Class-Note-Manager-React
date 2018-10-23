import React, {Component} from 'react';
import style from './Editor.module.scss';
import {localStorageGet, localStorageSet} from '../../../../Static/Functions';
import Store from '../../../../Store';
import {convert} from './Actions/Actions';

class Editor extends Component
{
    componentDidMount()
    {
        const noteContent = localStorageGet('noteContent');
        if (noteContent)
        {
            this.refs.editorInput.value = noteContent;
            Store.dispatch(convert(noteContent));
        }
    }

    onInput = (e) =>
    {
        localStorageSet('noteContent', e.target.value);
        Store.dispatch(convert(e.target.value));
    };

    render()
    {
        return (
            <div className={style.Editor}>
                <textarea className={style.editorInput}
                          autoFocus={true}
                          wrap={'off'}
                          onChange={this.onInput}
                          ref={'editorInput'}/>
            </div>
        );
    }
}

export default Editor;
