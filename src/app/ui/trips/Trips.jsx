import React from 'react'
import {connect} from 'react-redux'

import Trip from 'app/ui/trips/Trip'
import SquareButton from 'app/util/SquareButton'
import {startAddTripDialog} from 'app/logic/actions'
import s from './Trips.scss'

@connect(({data: {trips}}) => ({trips}))
export default class Trips extends React.Component {
    constructor() {
        super()

        this.handleAdd = () => this.props.dispatch(startAddTripDialog())
    }

    render() {
        const trips = this.props.contacts.map(trip => <Trip key={trip._id} {...trip}/>)
        return <div style={s.container}>
            <table>
                <tr>
                    <th>
                        <td>Boat</td>
                        <td>Crew</td>
                        <td>Destination</td>
                        <td>Departure</td>
                        <td>Arrival</td>
                        <td>Actions</td>
                    </th>
                </tr>
                {trips}
            </table>
            <div style={s.addLine}>
                <SquareButton value="+" onClick={this.handleAdd}/>
            </div>
        </div>
    }
}
