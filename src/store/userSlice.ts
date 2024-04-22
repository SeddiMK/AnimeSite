import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';

export type SearchUser = {
  // !!!!!!!!!!!!!!!!!
  sortBy: string;
  order: string;
  searchCategoryFilter: string;
  searchInpValData: string;
  currentPage: string;
};

export type User = {
  // !!!!!!!!!!!!!!!!!
  articul: string;
  title: string;
  cost: number;
  image: string;
  rating: number;
  description: string;
  currency: string;
};

export const fetchUserList = createAsyncThunk<User[], SearchUser>(
  'furniture/fetchFurnitureStatus',
  async (params) => {
    // (params:Record<string, string>)
    const { id, name, username, email, address, phone } = params;

    const { data } = await axios.get<User[]>(
      `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture?limit=9&page=${currentPage}&sortBy=${sortBy}&order=${order}&search=${searchInpValData}&filter=${searchCategoryFilter}`
    ); //limit=должен давать бэкенд(mockapi.io- не дает всех страниц от количетва товара и массив, объект корзины)limit=6&sortBy=cost&order=asc
    // console.log(
    //   `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture?page=${currentPage}&sortBy=${sortBy}&order=${order}&search=${searchInpValData}&filter=${searchCategoryFilter}`
    // );
    return data; // as Anime[];
  }
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface AnimeSliceState {
  items: User[];
  itemsReindexing: {};
  status: Status;
  loading: boolean;
}

const initialState: AnimeSliceState = {
  items: [],
  itemsReindexing: {},
  status: Status.LOADING, // loading | success | error
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserList.pending, (state) => {
      state.status = Status.LOADING;
      state.loading = true;
      state.items = [];
    });
    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
      state.loading = false;
      // if (state.items.length > 1) {
      //   // setItemsReindexing -----------------------------------
      //   state.items.reduce<{}>((accum: any, item: any) => {
      //     accum[item.articul] = item;
      //     return (state.itemsReindexing = accum);
      //   }, {});
      // }
    });

    builder.addCase(fetchUserList.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
      state.loading = false;
    });
  },
});

export const { setItems } = userSlice.actions;

export const itemsReindexing = (state: RootState) =>
  state.userSlice.itemsReindexing;
export const itemsFurnutere = (state: RootState) => state.userSlice.items;

export default userSlice.reducer;
