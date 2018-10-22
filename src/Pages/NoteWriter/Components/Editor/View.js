import React, {Component} from 'react';
import style from './Editor.module.scss';
import {localStorageSet} from '../../../../Static/Functions';

class Editor extends Component
{


    render()
    {
        return (
            <div className={style.Editor}>
                <textarea className={style.editorInput}/>
            </div>
        );
    }
}

export default Editor;
