import React from 'react'
import {connect} from 'react-redux'
import ComboSelect from 'react-combo-select'
import DateTimePicker from 'react-datetime-picker'

import {closeDialog, requestAddBoat, requestAddContact} from 'app/logic/actions'
import Spacer from 'app/util/Spacer'
import User from './User'
import style from './AddTrip.scss'


@connect(({ui: {addTrip}, data: {userInfo: {_id}, boats, destinations}}) => ({...addTrip, userId: _id, boats, destinations}))
export default class AddTrip extends React.Component {
    constructor() {
        super()
        this.state = {boat: '', destination: ''}
        this.handleCancel = () => this.props.dispatch(closeDialog())
        this.handleSubmit = () => {
            const {dispatch} = this.props
            const {boat, destination} = this.state
            dispatch(requestAddTrip(boat, destination))
            dispatch(closeDialog())
        }
        this.handleChangeBoat = event => this.setState({boat: event.target.value})
        this.handleChangeDestination = event => this.setState({destination: event.target.value})
    }

    render() {
        const {boats, destinations } = this.props
        const users = filteredUsers.map(user =>
            <div key={user._id}>
                <User {...user} onSelect={this.handleSelect}/>
                <Spacer/>
            </div>)

        return <form style={style.form} onSubmit={this.handleSubmit}>
        <Spacer/>
            <div style={style.formRow}>
        <label style={style.label}>Boat</label>
            <ComboSelect data={boats} map={text: name, value: _id} onChange={this.handleChangeBoat}/>
            </div>
            <div style={style.formRow}>
                <label style={style.label}>Destination</label>
                <ComboSelect data={destinations} map={text: 'name', value: '_id'} onChange={this.handleChangeDestination}/>
            </div>
            <div style={style.formRow}>
                <label style={style.label}>Departure</label>
                <DateTimePicker />
            </div>
            <div style={style.formRow}>
                <label style={style.label}>Arrival</label>
                <DateTimePicker />
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