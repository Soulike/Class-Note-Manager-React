import React, {Component} from 'react';
import style from './NoteReader.module.scss';
import Title from '../../Components/Title/View';
import {generateTimeStr, getAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';

class NoteReader extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            title: 'loading……',
            content: 'loading……',
            lastModifiedDate: 0
        };
    }

    componentDidMount()
    {
        const {id} = this.props.location.query;
        getAsync(requestPrefix('/getNote'), false, {id})
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    const {title, content, lastModifiedDate} = data;
                    this.setState({
                        title,
                        content,
                        lastModifiedDate
                    });
                }
                else
                {
                    Alert.show(msg, false);
                }
            })
            .catch(e =>
            {
                Alert.show('获取笔记失败', false);
                console.log(e);
            });
    }

    render()
    {
        const {title, content, lastModifiedDate} = this.state;
        return (
            <div className={style.NoteReader}>
                <Title text={title}/>
                <div className={style.lastModified}>{generateTimeStr(lastModifiedDate)}</div>
                <div className={style.content} dangerouslySetInnerHTML={{__html: content}}/>
            </div>
        );
    }

}

export default NoteReader;
