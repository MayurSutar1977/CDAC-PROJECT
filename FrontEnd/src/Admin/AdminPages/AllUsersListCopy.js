import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar'
import AdminSidebar from '../AdminSidebar'
import UserServices from '../Services/UserServices';

export default function AllUsersListCopy(props) {
    let i = 0;
    const [users, setUsers] = useState([]);

    const getUserData = async () => {
        await UserServices.getAllUsers().then((res) => {
            console.log(JSON.stringify(res.data.result));
            let tempUser = res.data.result;
            setUsers(tempUser)
        });
    };

    const viewUser = (id, name) => {
        props.history.push(`/view-user-details/${id}`)
    }
    const removeUser = (id) => {

    }


    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="main ml-0 mr-0" >
            <div className="row">
                <div class="container-fluid mt-0">
                    <AdminNavbar />
                </div>
            </div>
            <div className="row ">
                <div className="col-md-2 mt-1 ">
                    <AdminSidebar />
                </div>
                <div className="col center mt-0">
                    <div className="card-mb-3 mt-0 content">
                        {/*<h1 className="m-3 pt-3 text-center"></h1>*/}
                        <div className="card-body ">
                            <h2 className="text-center">All Avialable Users</h2>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No</th>
                                        <th scope="col">User Name </th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email Id</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Date Of Birth</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map(
                                            user =>
                                                <tr key={user.userId}>
                                                    <td>{++i}</td>
                                                    <td >{user.userName}</td>
                                                    <td >{user.firstName} {user.lastName}</td>
                                                    <td >{user.email}</td>
                                                    <td >{user.phoneNumber}</td>
                                                    <td >{user.dateOfBirth}</td>
                                                    <td><img src={user.categoryImage} alt="Profile Picture" style={{ width: "10%" }} /></td>
                                                    <td>
                                                        <button type="button" class="btn btn-outline-info" onClick={() => viewUser(user.userId, user.userName)}  >View</button>
                                                        <button type="button" class="btn btn-outline-danger" style={{ marginLeft: "10px" }} onClick={() => removeUser(user.id)}>Remove</button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

