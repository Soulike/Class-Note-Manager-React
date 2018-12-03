import React, {Component} from 'react';
import style from './NoteReader.module.scss';
import Title from '../../Components/Title/View';
import {generateTimeStr, getAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';
import showdown from 'showdown';

class NoteReader extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            name: 'loading……',
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
        const {id} = this.props.location.query;
        getAsync(requestPrefix('/getNote'), false, {id})
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    const {name, content, lastModifyTime} = data;
                    this.setState({
                        name,
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
        const {name, content, lastModifyTime} = this.state;
        return (
            <div className={style.NoteReader}>
                <Title text={name}/>
                <div className={style.lastModified}>{generateTimeStr(lastModifyTime)}</div>
                <div className={style.contentWrapper}>
                    <div className={style.content}
                         dangerouslySetInnerHTML={{__html: this.converter.makeHtml(content)}}/>
                </div>
            </div>
        );
    }

}

export default NoteReader;
