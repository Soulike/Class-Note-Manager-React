import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './NoteCard.module.scss';
import {generateTimeStr, postAsync, requestPrefix} from '../../../../Static/Functions';
import {View as Modal} from '../../../../Components/Modal';
import {View as Alert} from '../../../../Components/Alert';

class NoteCard extends Component
{
    onDeleteButtonClick = (e) =>
    {
        e.preventDefault();
        const {name} = this.props;
        let confirm = false;

        Modal.show('删除确认', `你确实要删除笔记 ${name}？此操作不可逆！`, () =>
        {
            confirm = true;
            if (confirm)
            {
                const {id} = this.props;
                postAsync(requestPrefix('/deleteNote'), {id})
                    .then(res =>
                    {
                        const {isSuccess, msg, data} = res;
                        Alert.show(msg, isSuccess);
                        setTimeout(() =>
                        {
                            document.location.reload();
                        }, 1000);

                    })
                    .catch(e =>
                    {
                        Alert.show('删除失败', false);
                        console.log(e);
                    });
            }
        });
    };


    render()
    {
        const {id, name, lastModified} = this.props;
        return (
            <div className={style.NoteCard}>
                <div className={style.left}>
                    <FontAwesomeIcon icon={solidIcon.faStickyNote} style={style.leftIcon}/>
                </div>
                <div className={style.right}>
                    <div className={style.upper}>
                        <div className={style.noteName}>{name}</div>
                        <div className={style.buttonWrapper}>
                            <Link onlyActiveOnIndex={false} to={`/NoteWriter?noteId=${id}`} target={'_blank'}>
                                <button className={style.modifyButton} title={'修改笔记'}>
                                    <FontAwesomeIcon icon={solidIcon.faPencilAlt} className={style.buttonIcon}/>
                                </button>
                            </Link>
                            <button className={style.deleteButton} onClick={this.onDeleteButtonClick} title={'删除笔记'}>
                                <FontAwesomeIcon icon={solidIcon.faTimes} className={style.buttonIcon}/>
                            </button>
                        </div>
                    </div>
                    <div className={style.lastModifiedDate}>
                        最后修改：
                        {generateTimeStr(lastModified)}
                    </div>
                </div>
            </div>
        );
    }
}

NoteCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lastModified: PropTypes.number.isRequired
};

export default NoteCard;
