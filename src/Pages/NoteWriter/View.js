import React, {Component} from 'react';
import style from './NoteWriter.module.scss';
import {View as FileName} from './Components/FileName';
import {View as Editor} from './Components/Editor';
import {View as Previewer} from './Components/Previewer';

class NoteWriter extends Component
{
    render()
    {
        return (
            <div className={style.NoteWriter}>
                <div className={style.fileInfoArea}>
                    <FileName/>
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
