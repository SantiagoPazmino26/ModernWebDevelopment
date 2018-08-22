import React from 'react'
import {connect} from 'react-redux'

import Destination from 'app/ui/admin/destination/Destination'
import SquareButton from 'app/util/SquareButton'
import {openAddDestinationDialog} from 'app/logic/actions'
import s from './Destinations.scss'

@connect(({data: {destinations}}) => ({destinations}))
export default class Destinations extends React.Component {
    constructor() {
        super()

        this.handleAdd = () => this.props.dispatch(openAddDestinationDialog())
    }

    render() {
        const destinations = this.props.destinations.map(destination => <Destination key={destination._id} {...destination}/>)
        return <div style={s.container}>
            Destinations
            {destinations}
            <div style={s.addLine}>

                <SquareButton value="+" onClick={this.handleAdd}/>
            </div>
        </div>
    }
}
