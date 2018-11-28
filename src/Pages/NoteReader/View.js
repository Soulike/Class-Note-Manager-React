import React, {Component} from 'react';
import style from './NoteReader.module.scss';
import Title from '../../Components/Title/View';
import {generateTimeStr, getAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';
import {checkSession} from '../Login/Functions';
import showdown from 'showdown';

class NoteReader extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            title: 'loading……',
            content: 'loading……',
            lastModifyTime: 0
        };

        this.converter = new showdown.Converter({
            tables: true,
            smoothLivePreview: true
        });
    }

    componentDidMount()
    {
        checkSession();
        const {id} = this.props.location.query;
        getAsync(requestPrefix('/getNote'), false, {id})
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    const {title, content, lastModifyTime} = data;
                    this.setState({
                        title,
                        content,
                        lastModifyTime
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
        const {title, content, lastModifyTime} = this.state;
        return (
            <div className={style.NoteReader}>
                <Title text={title}/>
                <div className={style.lastModified}>{generateTimeStr(lastModifyTime)}</div>
                <div className={style.content} dangerouslySetInnerHTML={{__html: this.converter.makeHtml(content)}}/>
            </div>
        );
    }

}

export default NoteReader;
