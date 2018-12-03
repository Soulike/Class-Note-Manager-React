import React, {Component} from 'react';
import {Link} from 'react-router';
import style from './NoteList.module.scss';
import {View as NoteCard} from './Components/NoteCard';
import {View as Title} from '../../Components/Title';
import {getAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';

class NoteList extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            noteList: [],
            requestSucceed: false
        };
    }

    componentDidMount()
    {
        getAsync(requestPrefix('/getNoteList'), false)
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    this.setState({
                        noteList: data,
                        requestSucceed: true
                    });
                }
                else
                {
                    Alert.show(msg, false);
                }
            })
            .catch(e =>
            {
                Alert.show('获取笔记列表失败', false);
                console.log(e);
            });
    }

    render()
    {
        const {noteList, requestSucceed} = this.state;
        return (
            <div className={style.NoteList}>
                <Title text={'笔记列表'}/>
                <div className={style.listArea}>
                    {
                        requestSucceed ? noteList.length === 0 ?
                            <h2 style={{textAlign: 'center'}}>你没有笔记的样子，快去写个新笔记吧！</h2> :
                            noteList.map(note =>
                            {
                                return (
                                    <Link onlyActiveOnIndex={false}
                                          to={`/NoteReader?id=${note.id}`}
                                          key={note.id}>
                                        <NoteCard {...note}/>
                                    </Link>
                                );
                            }) : <h2 style={{textAlign: 'center'}}>Loading……</h2>
                    }
                </div>
            </div>
        );
    }

}


export default NoteList;
