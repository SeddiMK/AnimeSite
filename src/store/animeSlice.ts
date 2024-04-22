import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';

export type SearchAnime = {
  // !!!!!!!!!!!!!!!!!
  sortBy: string;
  order: string;
  searchCategoryFilter: string;
  searchInpValData: string;
  currentPage: string;
};

export type Anime = {
  // !!!!!!!!!!!!!!!!!
  articul: string;
  title: string;
  cost: number;
  image: string;
  rating: number;
  description: string;
  currency: string;
};

export const fetchAnimeListSlice = createAsyncThunk<Anime[], SearchAnime>(
  'anime/fetchAnimeStatus',
  async (params, { rejectWithValue }) => {
    // (params:Record<string, string>)
    try {
      // const { id, name, username, email, phone, address } = params;
      // const { email, phonePass } = params;
      const resp = await axios.get<Anime[]>(
        `https://jsonplaceholder.typicode.com/users/`
      );

      if (resp.status !== 200) {
        throw new Error('Server Error!');
      }

      const data = resp.data;

      return data; // as Anime[];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface AnimeSliceState {
  items: Anime[];
  itemsReindexing: {};
  status: Status;
  error: string | unknown;
  loading: boolean;
}

const initialState: AnimeSliceState = {
  items: [],
  itemsReindexing: {},
  status: Status.LOADING, // loading | success | error
  error: '',
  loading: true,
};

// -----------------------------------store
const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnimeListSlice.pending, (state) => {
      state.status = Status.LOADING;
      state.loading = true;
      state.items = [];
    });
    builder.addCase(fetchAnimeListSlice.fulfilled, (state, action) => {
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

    builder.addCase(fetchAnimeListSlice.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload;
      state.items = [];
      state.loading = false;
    });
  },
});

export const { setItems } = animeSlice.actions;

export const itemsReindexing = (state: RootState) =>
  state.animeSlice.itemsReindexing;
export const itemsFurnutere = (state: RootState) => state.animeSlice.items;

export default animeSlice.reducer;
