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
        const trips = this.props.trips.map(trip => <Trip key={trip._id} {...trip}/>)
        return <div style={s.container}>
            <table>
                <thead>
                <tr>
                        <th>Boat</th>
                        <th>Crew</th>
                        <th>Destination</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {trips}
                </tbody>
            </table>
            <div style={s.addLine}>
                <SquareButton value="+" onClick={this.handleAdd}/>
            </div>
        </div>
    }
}
