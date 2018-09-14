import React from 'react'
import {connect} from 'react-redux'

import User from 'app/ui/admin/user/User'
import s from './Users.scss'

@connect(({data: {users}}) => ({users}))
export default class Users extends React.Component {
    constructor() {
        super()
    }

    render() {
        const users = this.props.users.map(user => <User key={user._id} {...user}/>)
        return <div style={s.container}>
            Users
            {users}
        </div>
    }
}
