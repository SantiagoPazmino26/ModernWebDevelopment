import React from 'react'
import {connect} from 'react-redux'

import {requestRemoveTrip, requestJoinTrip} from 'app/logic/actions'
import SquareButton from 'app/util/SquareButton'
import style from './Trip.scss'
import User from "../contacts/User";

@connect(({data: {userInfo: {_id}}}) => ({userId: _id}))
export default class Trip extends React.Component {
    constructor() {
        super()

        this.handleDelete = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveTrip(_id))
        }
        this.handleJoin = () => {
            const {_id, userId, dispatch} = this.props
            dispatch(requestJoinTrip(userId, _id))
        }
    }

    render() {
        const {boat, destination, departure, arrival} = this.props
        const users = this.props.users.map(user => <User key={user._id} {...user}/>)

        return <tr style={style.container}>
            <td>
                {boat.name}
            </td>
            <td>
                {users}
            </td>
            <td>
                {destination.name}
            </td>
            <td>
                {departure}
            </td>
            <td>
                {arrival}
            </td>
            <td>
                <SquareButton value="JOIN" onClick={this.handleJoin}/>
                <SquareButton style={style.deleteButton} value="x" onClick={this.handleDelete}/>
            </td>
        </tr>
    }
}