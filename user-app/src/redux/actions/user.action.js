import { userConstants } from "./constants"
import axios from 'axios'

export const getAllUsers = () => {
    return async (dispatch) => {
        dispatch({type: userConstants.GET_ALL_USER_REQUEST})

        const res = await axios.get('https://randomuser.me/api/?results=50')

        // console.log(res);

        if(res.status === 200){

            const userList = res.data.results
            // console.log(userList);

            dispatch({
                type: userConstants.GET_ALL_USER_SUCCESS,
                payload: {userList}
            })
        }else{
            dispatch({
                type: userConstants.GET_ALL_USER_FAILURE,
                payload: {error: res.data.error}
            })
        }
    }
}


export const getCheckedUsers = (data) => {
    return (dispatch) => {
        if(data){
            dispatch({
                type:userConstants.GET_SELECTED_USER_SUCCESS,
                payload:{data}
            })
        }else{
           console.log('aaa'); 
        }
    }
}

export const removeCheckUser = (data) => {
    return (dispatch) => {
        if(data){
            dispatch({
                type: userConstants.DELETE_CHECKED_USER_SUCCESS,
                payload: {data}
            })
        }else{
            console.log('sss');
        }
    }
}