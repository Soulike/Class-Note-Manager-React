import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import style from './Previewer.module.scss';

class Previewer extends Component
{
    render()
    {
        const {innerHTML} = this.props;
        return (
            <div className={style.Previewer} dangerouslySetInnerHTML={{__html: innerHTML}}/>
        );
    }
}

Previewer.PropTypes = {
    innerHTML: PropTypes.string.isRequired
};

const mapStateToProps = (state) =>
{
    const {innerHTML} = state['NoteWriterEditor'];
    return {
        innerHTML
    };
};

export default connect(mapStateToProps)(Previewer);
