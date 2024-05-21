import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';
// kodik---------------------------------------------------------------------
import { clientKodik } from '../kodikcfg';
import { Client, MaterialObject, VideoLinks } from 'kodikwrapper';

export type SearchAnimeParams = {
  titlePar: string;
  limitPar: number;
};

export type AnimeSearch = {
  id: string;
  imdb_id: string;
  kinopoisk_id: string;
  shikimori_id: string;
  link: string;
  other_title: string;
  quality: string;
  screenshots: [string];
  title: string;
  title_orig: string;
  translation: {
    id: number;
    title: string;
    type: string;
  };
  type: string;
  updated_at: string;
  worldart_link: string;
  year: number;
};

export const fetchAnimeListSlice = createAsyncThunk<
  AnimeSearch[],
  SearchAnimeParams
>('anime/fetchAnimeStatus', async (params) => {
  try {
    const { titlePar, limitPar } = params;
    const resp = await axios.get<AnimeSearch[]>(
      `http://kodikapi.com/list?limit=14&with_material_data=true&token=45c53578f11ecfb74e31267b634cc6a8`
    );

    if (resp.status !== 200) {
      throw new Error('Server Error!');
    }
    const data = resp.data;

    console.log(data, '------------data list------------');

    let animesItems: MaterialObject[] = [];
    let titles: string[] = [];
    let origTitles: string[] = [];

    await clientKodik
      .search({
        limit: limitPar,
        title: titlePar,
      })
      .then((response) => response.results)
      .then(async (material) => {
        if (!material) throw new Error('не найдено');

        console.log(material, '-------------------------materia  ----search');

        // setAnimeData(material);
        // type
        const related: MaterialObject[] = [];
        const title: string[] = [];
        const origTitle: string[] = [];
        let prevTitle: string | null = null;

        if (material) {
          for (const item of material) {
            if (
              (item.type === 'anime' || item.type === 'anime-serial') &&
              item.title !== prevTitle
            )
              related.push(item);
            if (item.type === 'anime' || item.type === 'anime-serial') {
              title.push(item.title);
              origTitle.push(item.title_orig);
            }

            prevTitle = item.title;
          }
        }

        animesItems = [...new Set(related)];

        titles = [...new Set(title)];
        origTitles = [...new Set(origTitle)];

        // const animeLinkVideo= (material[3].link); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

        // const title = (titles[0] + '. ' + origTitles[0]);
      });

    return animesItems; // as Anime[];
  } catch (error) {
    return error.message; //rejectWithValue(
  }
});

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface AnimeSliceState {
  items: AnimeSearch[];

  // itemsReindexing: {};

  status: Status;
  error: string | unknown;
  loading: boolean;
}

const initialState: AnimeSliceState = {
  items: [],

  // itemsReindexing: {},

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

// export const itemsReindexing = (state: RootState) =>
//   state.animeSlice.itemsReindexing;
export const itemsAnime = (state: RootState) => state.animeSlice.items;

export default animeSlice.reducer;
