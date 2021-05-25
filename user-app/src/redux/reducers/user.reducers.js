import { userConstants } from "../actions/constants";

const initialState = {
    allUsers: [],
    selectedUsers: [],
    loading: false,
    error: null
}

const checkSelectedUser = (selectedUser,data) => {
    return selectedUser.filter(ele => {
        return ele.email !== data.email
    })
}



export default (state = initialState, action) => {
    switch (action.type) {
        case userConstants.GET_ALL_USER_SUCCESS:
            state = {
                ...state,
                allUsers: action.payload.userList,
                loading: false
            }
        break;
        case userConstants.GET_SELECTED_USER_SUCCESS:
            const myArr = [...state.selectedUsers,action.payload.data];
            const filteredArr = myArr.reduce((acc, current) => {
                const x = acc.find(item => item.email === current.email);
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, []);
            state = {
                ...state,
                selectedUsers:filteredArr,
                loading: false
            }
        break;
        case userConstants.DELETE_CHECKED_USER_SUCCESS:
            const updated = checkSelectedUser(state.selectedUsers,action.payload.data)
            state = {
                ...state,
                loading: false,
                selectedUsers:updated
            }

    }
    return state;
}