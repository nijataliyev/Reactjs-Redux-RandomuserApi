import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getAllUsers } from '../../redux/actions/user.action';
import CheckUserDataTable from '../CheckUserDataTable/CheckUserDataTable';
import DataTable from '../DataTable/DataTable';
import SearchInput from '../SearchInput/SearchInput';
import './_newTabs.scss';


function NewTabs() {

    const state = useSelector(state => state.user.allUsers)
    const selectedUser = useSelector(state => state.user.selectedUsers)
    const [searchData,setSearchData] = useState('')
    const [searchResult,setSearchResult] = useState([])
    const [visible,setVisible] = useState(5)
    const dispatch = useDispatch();

    const searchHandler = (data) => {
        setSearchData(data)
        if(searchResult !== ""){
            const stateList = state.filter((item) => {
                return Object.values(item.name)
                .join(" ").toLowerCase().includes(data.toLowerCase())
            })
            setSearchResult(stateList)
        }else{
            setSearchResult(state)
        }
    }

    useEffect(() => {
        dispatch(getAllUsers())
    },[])

    return (
        <Tabs>
            <TabList>
                <Tab>All Users</Tab>
                <Tab>Checked Users</Tab>
            </TabList>

            <TabPanel>
                <SearchInput term={searchData} searchKeyword={searchHandler}/>
                <DataTable selectedUser={selectedUser} state={searchData.length < 1 ? state : searchResult}/>
            </TabPanel>
            <TabPanel>
                <CheckUserDataTable selectedUser={selectedUser}/>
            </TabPanel>
        </Tabs>
    )
}

export default NewTabs
