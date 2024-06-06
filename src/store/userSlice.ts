import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Users {
  id: number;
  photoUrl: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export type SearchUser = {
  idUser: number;
  // rejectWithValue: { error: string };
  // order: string;
  // searchCategoryFilter: string;
  // searchInpValData: string;
  // currentPage: string;
};

export const fetchUserList = createAsyncThunk<Users[], SearchUser>(
  'users/fetchUserListStatus',
  async (params, { rejectWithValue }) => {
    // (params:Record<string, string>)
    try {
      // const { id, name, username, email, phone, address } = params;
      // const { email, phonePass } = params;
      const resp = await axios.get<Users[]>(
        `https://jsonplaceholder.typicode.com/users/`
      );

      if (resp.status !== 200) {
        throw new Error('Server Error!');
      }

      const data = resp.data;

      return data; // as Users[];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// -----------------------------status
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface UsersSliceState {
  // itemsUsers: Users[];
  email: string;
  token: string;
  id: string;
  displayName: string;
  photoUrl: string;

  userListAnime: string[];

  status: Status;
  error: string | unknown;
  loading: boolean;
}

const initialState: UsersSliceState = {
  // itemsUsers: [],
  email: '',
  token: '',
  id: '',
  displayName: '',
  photoUrl: '',
  userListAnime: [],

  status: Status.LOADING, // loading | success | error
  error: '',
  loading: true,
};

// -------------------------------store
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      // state.itemsUsers = action.payload;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.displayName = action.payload.displayName;
      state.photoUrl = action.payload.photoUrl;
    },
    removeUser: (state) => {
      // state.items = action.payload;
      state.email = '';
      state.token = '';
      state.id = '';
      state.displayName = '';
    },
    addListAnime: (state, action: PayloadAction<any>) => {
      if (state.userListAnime.indexOf(action.payload) === -1)
        state.userListAnime.push(action.payload);
    },
    loginUser: (state, action: PayloadAction<any>) => {
      // state.items = action.payload;
      // state.email = '';
      // state.token = '';
      // state.id = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserList.pending, (state) => {
      state.status = Status.LOADING;
      state.loading = true;
      // state.itemsUsers = [];
    });
    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      // state.itemsUsers = action.payload;
      state.loading = false;
      // if (state.items.length > 1) {
      //   // setItemsReindexing -----------------------------------
      //   state.items.reduce<{}>((accum: any, item: any) => {
      //     accum[item.articul] = item;
      //     return (state.itemsReindexing = accum);
      //   }, {});
      // }
    });

    builder.addCase(fetchUserList.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload;
      // state.itemsUsers = [];
      state.loading = false;
    });
  },
});

export const { setUser, removeUser, addListAnime } = userSlice.actions;

// export const itemsUsers = (state: RootState) => state.userSlice.itemsUsers;

export default userSlice.reducer;
