import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {localStorageGet, localStorageSet} from '../../../../Static/Functions';
import style from './FileName.module.scss';

class FileName extends Component
{
    componentDidMount()
    {
        const fileName = this.getStoredFileName();

        if (fileName)
        {
            this.refs.filename.value = fileName;
            this.storeFileName(fileName);
        }
        else
        {
            this.refs.filename.value = '未命名';
            this.storeFileName('未命名');
        }
    }

    componentDidUpdate(prevProp, prevState, snapshot)
    {
        const {title} = this.props;
        if (title)
        {
            this.refs.filename.value = title;
        }
    }

    getStoredFileName = () =>
    {
        return localStorageGet('fileName');
    };

    storeFileName = (value) =>
    {
        localStorageSet('fileName', value);
    };

    onInputChange = (e) =>
    {
        this.storeFileName(e.target.value);
    };

    render()
    {
        return (
            <div className={style.FileName}>
                <div className={style.title}>文件名</div>
                <input type={'text'}
                       className={style.input}
                       contentEditable={true}
                       ref={'filename'}
                       onChange={this.onInputChange}/>
            </div>
        );
    }
}

FileName.propTypes = {
    title: PropTypes.string      // 用于预先填充数据
};

export default FileName;
