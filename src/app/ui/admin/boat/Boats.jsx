import React from 'react'
import {connect} from 'react-redux'

import Boat from 'app/ui/admin/boat/Boat'
import SquareButton from 'app/util/SquareButton'
import {openAddBoatDialog} from 'app/logic/actions'
import s from './Boats.scss'

@connect(({data: {boats}}) => ({boats}))
export default class Boats extends React.Component {
    constructor() {
        super()

        this.handleAdd = () => this.props.dispatch(openAddBoatDialog())
    }

    render() {
        const boats = this.props.contacts.map(boat => <Boat key={boat._id} {...boat}/>)
        return <div style={s.container}>
            {boats}
            <div style={s.addLine}>
                <SquareButton value="+" onClick={this.handleAdd}/>
            </div>
        </div>
    }
}
