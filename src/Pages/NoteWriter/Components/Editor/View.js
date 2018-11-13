import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
        else
        {
            Store.dispatch(convert(''));
        }
    }

    componentDidUpdate(prevProp, prevState, snapshot)
    {
        const {noteContent} = this.props;
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

Editor.propTypes = {
    noteContent: PropTypes.string  // 用于预先填充内容
};

export default Editor;
