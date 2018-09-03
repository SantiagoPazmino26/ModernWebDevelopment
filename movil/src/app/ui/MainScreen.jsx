import React from 'react'
import {connect} from 'react-redux'

import {
    requestLogout
} from 'app/logic/actions'
import App from 'app/ui/App'
import FlexGap from 'app/util/FlexGap'
import Spacer from 'app/util/Spacer'
import Dialog from 'app/util/Dialog'
import Login from 'app/ui/login/Login'
import style from './MainScreen.scss'
import {requestLogin} from "../logic/actions"


@connect(({data: {userInfo}, ui:{loginPage}}) => ({userInfo, loginPage}))
export default class MainScreen extends React.Component {
    constructor() {
        super()

        this.handleLogin = (email, password) => this.props.dispatch(requestLogin(email, password))
        this.handleLogout = () => this.props.dispatch(requestLogout())
    }

    render() {
        const {userInfo, loginPage} = this.props
        if (!userInfo) {
                return <Dialog title="LOGIN">
                    <Login onLogin={this.handleLogin} />
                </Dialog>
        }

        return <div style={style.container}>
            <div style={style.header}>
                <div style={style.headerItem}>Travel Diary</div>
                <FlexGap/>
                <div style={style.headerItem}>
                    <div>{userInfo.email}</div>
                    <Spacer horizontal/>
                    <div onClick={this.handleLogout}>Logout</div>
                </div>
            </div>
            <Spacer large/>
            <App/>
        </div>
    }
}
