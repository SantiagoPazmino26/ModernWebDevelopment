import React from 'react'
import {connect} from 'react-redux'

import {closeDialog, requestAddBoat} from 'app/logic/actions'
import Spacer from 'app/util/Spacer'
import style from './AddBoat.scss'

@connect(({ui: {addBoat}, data: {userInfo: {_id}}}) => ({...addBoat, userId: _id}))
export default class AddBoat extends React.Component {
    constructor() {
        super()

        this.handleCancel = () => this.props.dispatch(closeDialog())
        this.state = {name: '', capacity: ''}

        this.handleSubmit = () => {
            const {dispatch} = this.props
            const {name, capacity} = this.state
            dispatch(requestAddBoat(name, capacity))
            dispatch(closeDialog())
        }

        this.handleChangeName = event => this.setState({name: event.target.value})
        this.handleChangeCapacity = event => this.setState({capacity: event.target.value})
    }

    render() {
        const {name, capacity} = this.state
        return <form style={style.form} onSubmit={this.handleSubmit}>
            <Spacer/>
            <div style={style.formRow}>
                <label style={style.label}>Name</label>
                <input style={style.input} type="text" value={name} onChange={this.handleChangeName}/>
            </div>
            <div style={style.formRow}>
                <label style={style.label}>Capacity</label>
                <input style={style.input} type="text" value={capacity} onChange={this.handleChangeCapacity}/>
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