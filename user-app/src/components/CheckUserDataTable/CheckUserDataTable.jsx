import React, { useEffect, useState } from 'react'

function CheckUserDataTable(props) {

    const [date,setDate] = useState('');
    const time = new Date(),
        today = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();

    useEffect(() => {
        setDate(today)
    },[])

    return (
        <table className="users__table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Picture</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.selectedUser.map((item, i) => (
                        <tr key={i}>
                            <td>{item.name.first}</td>
                            <td>{item.name.last}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                                <img src={item.picture.thumbnail} alt="" />
                            </td>
                            <td>
                                {date}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CheckUserDataTable
