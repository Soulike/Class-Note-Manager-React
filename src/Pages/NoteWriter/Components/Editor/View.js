import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Editor.module.scss';
import {localStorageGet, localStorageSet} from '../../../../Static/Functions';
import Store from '../../../../Store';
import {convert} from './Actions/Actions';
import {View as Alert} from '../../../../Components/Alert';

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
        Store.dispatch(convert(''));
        const lastId = parseInt(localStorageGet('lastModifyId'));
        let {id} = this.props.location.query;
        id = parseInt(id);
        if (id && lastId === id)
        {
            const content = Editor.getStoredContent();
            if (content)
            {
                Alert.show('已为您恢复上次未提交内容', true);
                this.refs.editorInput.value = content;
                Store.dispatch(convert(content));
            }
        }
        else
        {
            localStorageSet('lastModifyId', id.toString());
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
    content: PropTypes.string,  // 用于预先填充内容
    location: PropTypes.object
};

export default Editor;
