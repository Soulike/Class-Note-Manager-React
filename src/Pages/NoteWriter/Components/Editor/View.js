import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Editor.module.scss';
import {localStorageGet, localStorageSet} from '../../../../Static/Functions';
import Store from '../../../../Store';
import {convert} from './Actions/Actions';

class Editor extends Component
{
    static getStoredContent()
    {
        return localStorageGet('content');
    }

    static storeContent(content)
    {
        localStorageSet('content', content);
    }

    componentDidMount()
    {
        const content = Editor.getStoredContent();

        if (content)
        {
            this.refs.editorInput.value = content;
            Store.dispatch(convert(content));
        }
        else
        {
            Store.dispatch(convert(''));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {content} = this.props;
        if (content)
        {
            this.refs.editorInput.value = content;
            Store.dispatch(convert(content));
            Editor.storeContent(content);
        }
        else
        {
            Store.dispatch(convert(''));
            Editor.storeContent('');
        }
    }

    onInput = (e) =>
    {
        Editor.storeContent(e.target.value);
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
    content: PropTypes.string  // 用于预先填充内容
};

export default Editor;
