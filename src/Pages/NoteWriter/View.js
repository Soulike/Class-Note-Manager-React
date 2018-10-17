import React, {Component} from 'react';
import style from './NoteWriter.module.scss';
import {View as FileName} from './Components/FileName';

class NoteWriter extends Component
{
    render()
    {
        return (
            <div className={style.NoteWriter}>
                <div className={style.fileInfoArea}>
                    <FileName/>
                </div>
            </div>
        );
    }
}

export default NoteWriter;
