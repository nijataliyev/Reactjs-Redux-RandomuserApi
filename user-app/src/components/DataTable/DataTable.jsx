import React, { useEffect, useRef, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getAllUsers, getCheckedUsers, removeCheckUser } from '../../redux/actions/user.action';
import './_dataTable.scss'
import NewModal from '../NewModal/NewModal';

function DataTable(props) {

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(20)
    const [show, setShow] = useState(false);
    const [userDetailModal, setUserDetailModal] = useState(false);
    const [userDetail, setUserDetail] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function addEntryClick(e, item) {
        let checked = e.target.checked;
        let selecetedElement = e.target.parentElement.parentElement;
        console.log(item);
        if (checked) {
            dispatch(getCheckedUsers(item))
            selecetedElement.style.background = "red"
        } else {
            dispatch(removeCheckUser(item))
            selecetedElement.style.background = "white"
        }

    }


    function addAllUser(e, item) {
        let checked = e.target.checked;
        let inputCheckbox = document.querySelectorAll('.input__checkbox')
        if (checked) {
            inputCheckbox.forEach(item => {
                let trList = item.parentElement.parentElement
                item.checked = true
                trList.style.background = "red"
            })
            item.slice(0, visible).forEach(x => {
                dispatch(getCheckedUsers(x))
            })
        } else {
            inputCheckbox.forEach(item => {
                let trList = item.parentElement.parentElement
                item.checked = false
                trList.style.background = "white"
            })
            item.slice(0, visible).forEach(x => {
                dispatch(removeCheckUser(x))
            })
        }
    }


    const loadMore = () => {
        setVisible(visible + 20)
    }

    const handleCloseUserDetailsModal = () => {
        setUserDetailModal(false)
    }

    const showUserDetailModal = (user) => {
        setUserDetailModal(true)
        setUserDetail(user)
    }

    const renderUserDetailsModal = () => {

        if (!userDetail) {
            return null;
        }
        console.log(userDetail);

        return (
            <NewModal
                size="lg"
                show={userDetailModal}
                modalTitle={"User Details"}
                handleClose={handleCloseUserDetailsModal}
            >
            <div className="newmodal__content">
                <div className="newmodal__left__content">
                    <img src={userDetail.picture.large} alt="" />
                    <h4>{userDetail.name.title}</h4>
                    <h4>{`${userDetail.name.first} ${userDetail.name.last}`}</h4>
                </div>
                <div className="newmodal__right__content">
                    <div>
                        <label>Email</label>
                        <p>{userDetail.email}</p>
                    </div>
                    <div>
                        <label>Cell</label>
                        <p>{userDetail.cell}</p>
                    </div>
                    <div>
                        <label>BirthDate</label>
                        <p>{userDetail.dob.date}</p>
                        <label>Age</label>
                        <p>{userDetail.dob.age}</p>
                    </div>
                    <div>
                        <label>Country</label>
                        <p>{userDetail.location.country}</p>
                        <label>City</label>
                        <p>{userDetail.location.city}</p>
                        <label>Post Code</label>
                        <p>{userDetail.location.postcode}</p>
                        <label>State</label>
                        <p>{userDetail.location.state}</p>
                    </div>
                </div>
            </div>

            </NewModal>
        )
    }

    const renderData = (data, checkUser) => {
        return (
            <table className="users__table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" onChange={(e) => addAllUser(e, data)} />
                        </th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Picture</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        data.slice(0, visible).map((item, i) => {
                            let checkedUser = checkUser.some(x => x.email == item.email)
                            return (
                                <tr className={
                                    `tr__list ${checkedUser && "active"}`
                                } key={i}>
                                    <td><input className="input__checkbox" checked={
                                        checkedUser ? true : false
                                    } type="checkbox" onChange={(e) => addEntryClick(e, item)} /></td>
                                    <td>{item.name.first}</td>
                                    <td>{item.name.last}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <img src={item.picture.thumbnail} alt="" />
                                    </td>
                                    <td>
                                        <Button onClick={() => { showUserDetailModal(item) }} variant="dark">
                                            <FontAwesomeIcon icon={faInfo} /> Detail
                                    </Button>
                                    </td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
        )
    }

    return (
        <div>
            {renderData(props.state, props.selectedUser)}
            <div>
                <button onClick={loadMore}>Load more</button>
            </div>
            {renderUserDetailsModal()}
        </div>
    )
}

export default DataTable
