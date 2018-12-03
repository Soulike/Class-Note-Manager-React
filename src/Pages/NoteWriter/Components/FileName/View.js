import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {localStorageGet, localStorageSet} from '../../../../Static/Functions';
import style from './FileName.module.scss';

class FileName extends Component
{
    static getStoredName()
    {
        return localStorageGet('name');
    };

    static storeName(value)
    {
        localStorageSet('name', value);
    };

    componentDidMount()
    {
        const lastId = parseInt(localStorageGet('lastModifyId'));
        let {id} = this.props.location.query;
        id = parseInt(id);
        if (id && lastId === id)
        {
            const name = FileName.getStoredName();

            if (name)
            {
                this.refs.filename.value = name;
                FileName.storeName(name);
            }
            else
            {
                this.refs.filename.value = '未命名';
                FileName.storeName('未命名');
            }
        }
        else
        {
            this.refs.filename.value = '未命名';
            FileName.storeName('未命名');
        }
    }

    componentDidUpdate(prevProp, prevState, snapshot)
    {
        const {name} = this.props;
        if (name)
        {
            this.refs.filename.value = name;
            FileName.storeName(name);
        }
    }

    onInputChange = (e) =>
    {
        FileName.storeName(e.target.value);
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
    name: PropTypes.string,      // 用于预先填充数据
    location: PropTypes.object
};

export default FileName;
