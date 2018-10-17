import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './TopBar.module.scss';
import PageLink from './Components/PageLink/View';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class TopBar extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            links: [
                {
                    icon: solidIcon.faList,
                    text: '笔记列表',
                    href: '/NoteList'
                },
                {
                    icon: solidIcon.faPen,
                    text: '新笔记',
                    href: '/NoteWriter'
                }
            ]
        };
    }

    render()
    {
        const {links} = this.state;
        const {hasLoggedIn} = this.props;
        return (
            <div className={style.TopBar}>
                <div className={style.title}>
                    <div className={style.icon}>
                        <FontAwesomeIcon icon={solidIcon.faCode}/>
                    </div>
                    笔记管理
                </div>
                {hasLoggedIn ? <div className={style.linkWrapper}>
                    {
                        links.map((link, i) =>
                        {
                            return <PageLink {...link} key={i}/>;
                        })
                    }
                </div> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {hasLoggedIn} = state.Login;
    return {
        hasLoggedIn
    };
};

export default connect(mapStateToProps)(TopBar);

