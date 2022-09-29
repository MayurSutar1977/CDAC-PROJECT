import React, { Component } from 'react'
import UserRegistration from './UserRegistration'
import UserProfile from './ViewProfile'


export default class Example extends Component {
    render() {
        return (
            <div >
                <div className="main" >

                <div className="row">
                </div>
                    <div className="row">
                        <div className="col-md-3 mt-0">
                            <div className="cart text-center sidebar">
                                <div className="card-body">
                                    <UserRegistration />
                                </div>
                            </div>
                        </div>
                        <div className="col mt-0">
                            <div className="card-mb-3 mt-0 content">
                                <h1 className="m-3 pt-3 text-center"></h1>
                                <div className="card-body">
                                    <UserProfile />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
