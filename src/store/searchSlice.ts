import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';
// kodik---------------------------------------------------------------------
import { clientKodik } from '../kodikcfg';
import { Client, MaterialObject, VideoLinks } from 'kodikwrapper';

import { Navigate, useNavigate } from 'react-router-dom';
import { SetStateAction, useState } from 'react';

export type SearchAnimeParams = {
  titlePar: string;
  limitPar: number;
};

export type AnimeSearch = {
  length: number;
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

export const fetchAnimeSearchSlice = createAsyncThunk<
  AnimeSearch[],
  SearchAnimeParams
>('anime/fetchAnimeStatus', async (params) => {
  try {
    const { titlePar, limitPar } = params;
    // const navigate = useNavigate();
    const resp = await axios.get<AnimeSearch[]>(
      `http://kodikapi.com/search?limit=${limitPar}&title=${titlePar}&with_material_data=true&token=45c53578f11ecfb74e31267b634cc6a8`
    );

    if (resp.status !== 200) {
      throw new Error('Server Error!');
    }
    const data = resp.data;

    console.log(data, '------------data search------------');

    // const [animesItemsSearch, setAnimesItemsSearch] = useState<any>([]);
    let animesItemsSearch: MaterialObject[] = [];
    let animesItemsSearchAll: MaterialObject[] = [];
    let titles: string[] = [];
    let origTitles: string[] = [];

    await clientKodik
      .search({ limit: limitPar, title: titlePar })
      .then((response) => response.results)
      .then(async (material) => {
        if (material.length === 0) return new Error('не найдено. нет данных.');

        console.log(material, '---------materia----search--in_slice');
        animesItemsSearchAll = material;
        // setAnimeData(material); MaterialObject[]
        // type
        const related: MaterialObject[] = [];
        const title: string[] = [];
        const origTitle: string[] = [];
        let prevTitle: string | null = null;

        if (material.length !== 0) {
          // let prevTitle: string | null = material[0].title;
          for (const item of material) {
            // console.log(
            //   String(item.year) === item.created_at.substring(0, 4),
            //   'String(item.year) === item.created_at.substring(0, 4)'
            // );
            // проверяем год загрузки и год выпуска аниме(исключаем видео-мангу)
            // if (String(item.year) === item.created_at.substring(0, 4)) {
            // только аниме и аниме сериалы(исключаем мангу), убираем дубликаты && item.title !== prevTitle
            // || item.type === 'anime-serial'
            console.log(
              item.type === 'anime' || item.type === 'anime-serial',
              '(item.type === anime || item.type === anime-serial)'
            );
            if (
              (item.type === 'anime' || item.type === 'anime-serial') &&
              item.title_orig.toLowerCase() !== prevTitle
            ) {
              related.push(item);
            }

            if (item.type === 'anime' || item.type === 'anime-serial') {
              title.push(item.title);
              origTitle.push(item.title_orig);
            }

            prevTitle = item.title_orig.toLowerCase();
          }
        }

        // let uniqueTitles = new Set();
        // // let uniqueTitles = new Set();
        // let uniqueArr = related.filter((item) => {
        //   if (!uniqueTitles.has(item.title.toLowerCase())) {
        //     uniqueTitles.add(item.title.toLowerCase());
        //     return true;
        //   }
        //   return false;
        // });

        // console.log(uniqueArr, 'uniqueArr');
        //      [
        //         {id: 'movie-48997',title: 'Проза бродячих псов: Путешествие в одиночку'}

        //         {id: 'movie-95701',  title: 'Проза бродячих псов: Путешествие в одиночку'}

        //         {id: 'movie-99083', title: 'Проза бродячих псов: Путешествие в одиночку'}

        //         {id: 'movie-76481', title: 'Проза бродячих псов: Путешествие в одиночку'}

        //         {id: 'movie-79385',  title: 'В одиночку'}

        //         {id: 'movie-20516',  title: 'Прятки в одиночку'}

        //         {id: 'serial-2987', title: 'Выпивая в одиночку'}

        //         {id: 'serial-43111',  title: 'Выпивая в одиночку'}

        //         {id: 'movie-9128',  title: 'В людях'}

        //         {id: 'movie-62378',  title: 'В тишине'}

        //         {id: 'serial-34006',  title: 'Жизнь не в одиночку'}

        //         {id: 'serial-56384',  title: 'Поднятие уровня в одиночку'}

        //         {id: 'serial-56386',  title: 'Поднятие уровня в одиночку'}

        //         {id: 'serial-56392', title: 'Поднятие уровня в одиночку'}

        // { id: 'serial-56402',  title: 'Поднятие уровня в одиночку' }]

        // if (related.length !== 0) {
        //   for (const item of related) {
        //   }
        // }

        // -------------------------------------------------------
        // let pp = arr.filter(
        //   (el, ind) =>
        //     ind ===
        //     arr.findIndex(
        //       (elem) => elem.jobid === el.jobid && elem.id === el.id
        //     )
        // );

        console.log(related, 'related');

        if (related.length !== 0) {
          // setAnimesItemsSearch([...new Set(related)]);
          // setAnimesItemsSearch(related);
          animesItemsSearch = related;
        } else {
          console.log('не данных для показа');
          // navigate('/error', { replace: true });
        }

        titles = [...new Set(title)];
        origTitles = [...new Set(origTitle)];

        // const animeLinkVideo= (material[3].link); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

        // const title = (titles[0] + '. ' + origTitles[0]);

        // countries(params?: CountriesParams): Promise<CountriesResponse>;
        // genres(params?: GenresParams): Promise<GenresResponse>;
        // list(params?: ListParams): Promise<ListResponse>;
        // qualities(params?: QualitiesParams): Promise<QualitiesResponse>;
        // qualitiesV2(params?: QualitiesV2Params): Promise<QualitiesV2Response>;
        // search(params?: SearchParams): Promise<SearchResponse>;
        // translations(params?: TranslationsParams): Promise<TranslationsResponse>;
        // translationsV2(params?: TranslationsV2Params): Promise<TranslationsV2Response>;
        // years(params?:

        // [animesItemsSearchAll, animesItemsSearch]
      });

    return animesItemsSearch; // animesItemsSearch; // as Anime[];data.results;
  } catch (error) {
    return error.message; //rejectWithValue(
  }
});

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface AnimeSearchSliceState {
  itemsSearch: AnimeSearch[];

  // itemsReindexing: {};

  status: Status;
  error: string | unknown;
  loading: boolean;
}

const initialState: AnimeSearchSliceState = {
  itemsSearch: [],

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
    setItemsSearch: (state, action: PayloadAction<[]>) => {
      state.itemsSearch = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAnimeSearchSlice.pending, (state) => {
      state.status = Status.LOADING;
      state.loading = true;
      state.itemsSearch = [];
    });
    builder.addCase(fetchAnimeSearchSlice.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.itemsSearch = action.payload;
      state.loading = false;

      // if (state.itemsSearch.length > 1) {
      //   // setItemsReindexing -----------------------------------
      //   state.items.reduce<{}>((accum: any, item: any) => {
      //     accum[item.articul] = item;
      //     return (state.itemsReindexing = accum);
      //   }, {});
      // }
    });

    builder.addCase(fetchAnimeSearchSlice.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload;
      state.itemsSearch = [];
      state.loading = false;
    });
  },
});

export const { setItemsSearch } = animeSlice.actions;

// export const itemsReindexing = (state: RootState) =>
//   state.animeSlice.itemsReindexing;
export const itemsAnimeSearch = (state: RootState) =>
  state.searchSlice.itemsSearch;

export default animeSlice.reducer;
