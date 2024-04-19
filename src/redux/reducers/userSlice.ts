import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser, LoadAvatarAction } from "../../models/redux";

export interface UserState {
    users: IUser[]
}

const initialState: UserState = {
    users: [
        { id: 'wfiavbF', name: 'Senko', password: 'UwU', isAuth: false },
        { id: 'sgrregz', name: 'admin', password: 'root', isAuth: false }
    ]
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser(state, action: PayloadAction<IUser>) {
            state.users.push(action.payload);
        },
        setUserAuth(state, action: PayloadAction<IUser>) {
            const user = state.users.find(u => u.id === action.payload.id);
            if(user) {
                user.isAuth = true;
            }
        },
        loadAvatar(state, action: PayloadAction<LoadAvatarAction>) {
            const user = state.users.find(u => u.id === action.payload.user.id);
            if(user) {
                user.avatar = action.payload.avatar;
            }
        },
        unAuthorizeAll(state) {
            state.users.forEach(u => u.isAuth = false);
        }
    }
});

export default userSlice.reducer;