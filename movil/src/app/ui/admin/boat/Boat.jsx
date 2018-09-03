import React from 'react'
import {connect} from 'react-redux'

import {requestRemoveBoat} from 'app/logic/actions'
import SquareButton from 'app/util/SquareButton'
import FlexGap from 'app/util/FlexGap'
import style from './Boat.scss'

@connect()
export default class Boat extends React.Component {
    constructor() {
        super()

        this.handleDelete = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveBoat(_id))
        }
    }

    render() {
        const {name, capacity} = this.props

        return <div style={style.container}>
            <div>{name}</div>
            <div>{capacity}</div>
            <FlexGap/>
            <SquareButton style={style.deleteButton} value="x" onClick={this.handleDelete}/>
        </div>
    }
}