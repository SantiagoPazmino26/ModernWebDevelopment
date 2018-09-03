import React from 'react'
import {connect} from 'react-redux'

import {closeDialog, requestAddDestination} from 'app/logic/actions'
import Spacer from 'app/util/Spacer'
import style from './AddDestination.scss'

@connect(({ui: {addContact}, data: {userInfo: {_id}, contacts}}) => ({...addContact, userId: _id, contacts}))
export default class AddDestination extends React.Component {
    constructor() {
        super()

        this.handleCancel = () => this.props.dispatch(closeDialog())
        this.state = {name: '', code: ''}

        this.handleSubmit = () => {
            const {dispatch} = this.props
            const {name, code} = this.state
            dispatch(requestAddDestination(name, code))
            dispatch(closeDialog())
        }

        this.handleChangeName = event => this.setState({name: event.target.value})
        this.handleChangeCode = event => this.setState({code: event.target.value})
    }

    render() {
        const {name, code} = this.state
        return <form style={style.form} onSubmit={this.handleSubmit}>
            <Spacer/>
            <div style={style.formRow}>
                <label style={style.label}>Name</label>
                <input style={style.input} type="text" value={name} onChange={this.handleChangeName}/>
            </div>
            <div style={style.formRow}>
                <label style={style.label}>Code</label>
                <input style={style.input} type="text" value={code} onChange={this.handleChangeCode}/>
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