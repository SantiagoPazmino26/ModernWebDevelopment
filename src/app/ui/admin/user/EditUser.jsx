import React from 'react'
import {connect} from 'react-redux'

import {closeDialog, requestAddDestination} from 'app/logic/actions'
import Spacer from 'app/util/Spacer'
import style from './AddDestination.scss'

@connect(({ui: {editUser}, data: {user}}) => ({...editUser, user}))
export default class EditUser extends React.Component {
    constructor() {
        super()

        this.handleCancel = () => this.props.dispatch(closeDialog())
        this.state = {name: this.props.user.name, nickname: this.props.user.nickname}

        this.handleSubmit = () => {
            const {user, dispatch} = this.props
            const {name, nickname} = this.state
            dispatch(requestEditUser(name, nickname, user._id))
            dispatch(closeDialog())
        }

        this.handleChangeName = event => this.setState({name: event.target.value})
        this.handleChangeNickname = event => this.setState({nickname: event.target.value})
    }

    render() {
        const {name, nickname} = this.state
        return <form style={style.form} onSubmit={this.handleSubmit}>
            <Spacer/>
            <div style={style.formRow}>
                <label style={style.label}>Name</label>
                <input style={style.input} type="text" value={name} onChange={this.handleChangeName}/>
            </div>
            <div style={style.formRow}>
                <label style={style.label}>Nickname</label>
                <input style={style.input} type="text" value={nickname} onChange={this.handleChangeNickname}/>
            </div>
            <div className="row">
                <input style={style.loginButton} type="submit" value="add"/>
            </div>
            <div style={style.cancelRow}>
                <input type="button" value="cancel" onClick={this.handleCancel}/>
            </div>
        </form>
    }
}