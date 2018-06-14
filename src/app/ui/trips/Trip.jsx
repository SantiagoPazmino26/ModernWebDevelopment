import React from 'react'
import {connect} from 'react-redux'

import {requestRemoveContact} from 'app/logic/actions'
import SquareButton from 'app/util/SquareButton'
import style from './Trip.scss'

@connect()
export default class Trip extends React.Component {
    constructor() {
        super()

        this.handleDelete = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveContact(_id))
        }
    }

    render() {
        const {boat, user, destination, departure, arrival} = this.props

        return <tr style={style.container}>
            <td>
                {boat}
            </td>
            <td>
                {user}
            </td>
            <td>
                {destination}
            </td>
            <td>
                {departure}
            </td>
            <td>
                {arrival}
            </td>
            <td>
                <SquareButton style={style.deleteButton} value="x" onClick={this.handleDelete}/>
            </td>
        </tr>
    }
}