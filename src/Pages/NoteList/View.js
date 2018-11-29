import React, {Component} from 'react';
import {Link} from 'react-router';
import style from './NoteList.module.scss';
import {View as NoteCard} from './Components/NoteCard';
import {View as Title} from '../../Components/Title';
import {getAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';
import {checkSession} from '../Login/Functions';

class NoteList extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            noteList: []
        };
    }

    componentDidMount()
    {
        checkSession();
        getAsync(requestPrefix('/getNoteList'), false)
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    this.setState({noteList: data});
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
        const {noteList} = this.state;
        return (
            <div className={style.NoteList}>
                <Title text={'笔记列表'}/>
                <div className={style.listArea}>
                    {
                        noteList.length === 0 ? <h2 style={{textAlign: 'center'}}>你没有笔记的样子，快去写个新笔记吧！</h2> :
                            noteList.map(note =>
                            {
                                return (
                                    <Link onlyActiveOnIndex={false}
                                          to={`/NoteReader?id=${note.id}`}
                                          key={note.id}>
                                        <NoteCard {...note}/>
                                    </Link>
                                );
                            })
                    }
                </div>
            </div>
        );
    }

}


export default NoteList;
