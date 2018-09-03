import React from 'react'
import {connect} from 'react-redux'

import {requestRemoveBoat} from 'app/logic/actions'
import SquareButton from 'app/util/SquareButton'
import FlexGap from 'app/util/FlexGap'
import style from './Destination.scss'

@connect()
export default class Destination extends React.Component {
    constructor() {
        super()

        this.handleDelete = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveBoat(_id))
        }
    }

    render() {
        const {name, code} = this.props

        return <div style={style.container}>
            <div>{name}</div>
            <div>{code}</div>
            <FlexGap/>
            <SquareButton style={style.deleteButton} value="x" onClick={this.handleDelete}/>
        </div>
    }
}