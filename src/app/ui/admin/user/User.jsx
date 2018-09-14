import React from 'react'
import {connect} from 'react-redux'

import {openEditUserDialog,requestRemoveUser} from 'app/logic/actions'
import SquareButton from 'app/util/SquareButton'
import FlexGap from 'app/util/FlexGap'
import style from './User.scss'

@connect()
export default class User extends React.Component {
    constructor() {
        super()

        this.handleEdit = () => {
            const {_id, dispatch} = this.props
            dispatch(openEditUserDialog(_id))
        }

        this.handleDelete = () => {
            const {_id, dispatch} = this.props
            dispatch(requestRemoveUser(_id))
        }
    }

    render() {
        const {name, nickname} = this.props

        return <div style={style.container}>
            <div>{name}</div>
            <div>{nickname}</div>
            <FlexGap/>
            <SquareButton style={style.deleteButton} value="*" onClick={this.handleEdit()}/>
            <FlexGap/>
            <SquareButton style={style.deleteButton} value="*" onClick={this.handleDelete}/>
        </div>
    }
}