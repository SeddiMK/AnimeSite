import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';
// kodik---------------------------------------------------------------------
import { kodikApiKey } from '../kodikcfg';
// import { Client, MaterialObject, VideoLinks } from 'kodikwrapper';

export type SearchAnimeParams = {
  idAnime: string;
  searchInpVal: string;
  limitPar: number;
};

export type AnimeSearch = {
  length: number;
  id: string;
  imdb_id: string;
  kinopoisk_id: string;
  shikimori_id: string;
  link: string;
  material_data: {
    imdb_rating: number;
    imdb_votes: number;
    kinopoisk_rating: number;
    kinopoisk_votes: number;
    shikimori_rating: number;
    shikimori_votes: number;

    anime_license_name: string;
    actors: string[];
    all_genres: string;
    anime_status: string;
    anime_studios: string[];
    anime_title: string;
    description: string;
    duration: 24;
    episodes_aired: 7;
    episodes_total: 11;
    minimal_age: 16;
    anime_kind: string;
    title: string;
    title_en: string;
    screenshots: string[];
    poster_url: string;
    year: number;
    aired_at: string;
    all_status: string;
    anime_description: string;
    anime_genres: string[];
    next_episode_at: string;
    other_titles: string[];
    other_titles_en: string[];
    other_titles_jp: string[];
    rating_mpaa: string;
  };
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
>('search/fetchAnimeStatus', async (params) => {
  try {
    const { idAnime, searchInpVal, limitPar } = params;

    //  console.log(
    //   `http://kodikapi.com/search?limit=${limitPar}&title=${searchInpVal}${idAnime}&with_material_data=true`
    // );

    const resp = await axios.get(
      `https://cors-anywhere-d58jih5xd-maxs-projects-4db4b9f2.vercel.app/http://kodikapi.com/search?limit=${limitPar}&title=${searchInpVal}${idAnime}&with_material_data=true&token=${kodikApiKey}`
    );

    if (resp.status !== 200) {
      throw new Error('Server Error!');
    }
    const data: AnimeSearch[] = resp.data.results;

    // console.log(data, '------------data search------------');
    // -------------------------------------------------------------------------------
    //     // countries(params?: CountriesParams): Promise<CountriesResponse>;
    //     // genres(params?: GenresParams): Promise<GenresResponse>;
    //     // list(params?: ListParams): Promise<ListResponse>;
    //     // qualities(params?: QualitiesParams): Promise<QualitiesResponse>;
    //     // qualitiesV2(params?: QualitiesV2Params): Promise<QualitiesV2Response>;
    //     // search(params?: SearchParams): Promise<SearchResponse>;
    //     // translations(params?: TranslationsParams): Promise<TranslationsResponse>;
    //     // translationsV2(params?: TranslationsV2Params): Promise<TranslationsV2Response>;
    //     // years(params?:
    // -------------------------------------------------------------------------------

    let animesItemsSearch: AnimeSearch[] = [];
    let animesItemsSearchNotTest: AnimeSearch[] = [];
    // let animesItemsSearchAll: AnimeSearch[] = [];
    let prevTitle: string | null = null;

    if (data.length !== 0) {
      // let prevTitle: string | null = material[0].title;
      for (const item of data) {
        if (
          (item.type === 'anime' || item.type === 'anime-serial') &&
          item.title_orig.toLowerCase() !== prevTitle
        ) {
          animesItemsSearch.push(item);
        } else {
          animesItemsSearchNotTest.push(item);
        }

        // if (item.type === 'anime' || item.type === 'anime-serial') {
        //   title.push(item.title);
        //   origTitle.push(item.title_orig);
        // }

        prevTitle = item.title_orig.toLowerCase();
      }
    } else {
      console.log('нет данных для показа');
    }
    // ----------- clien kodik ----------------------------------------------------
    // const [animesItemsSearch, setAnimesItemsSearch] = useState<any>([]);

    // let titles: string[] = [];
    // let origTitles: string[] = [];

    // await clientKodik
    //   .search({ limit: limitPar, title: titlePar })
    //   .then((response) => response.results)
    //   .then(async (material) => {
    //     if (material) return new Error('не найдено. нет данных.');

    //     console.log(material, '---------materia----search--in_slice');
    //     animesItemsSearchAll = material;
    //     // setAnimeData(material); MaterialObject[]

    //     // type
    //     const related: MaterialObject[] = [];
    //     const title: string[] = [];
    //     const origTitle: string[] = [];
    //     let prevTitle: string | null = null;

    //     if (material.length !== 0) {
    //       // let prevTitle: string | null = material[0].title;
    //       for (const item of material) {
    //         if (
    //           (item.type === 'anime' || item.type === 'anime-serial') &&
    //           item.title_orig.toLowerCase() !== prevTitle
    //         ) {
    //           animesItemsSearch.push(item);
    //         } else {
    //           console.log('не данных для показа');
    //           // navigate('/error', { replace: true });
    //         }

    //         if (item.type === 'anime' || item.type === 'anime-serial') {
    //           title.push(item.title);
    //           origTitle.push(item.title_orig);
    //         }

    //         prevTitle = item.title_orig.toLowerCase();
    //       }
    //     }

    //     // let uniqueTitles = new Set();
    //     // // let uniqueTitles = new Set();
    //     // let uniqueArr = related.filter((item) => {
    //     //   if (!uniqueTitles.has(item.title.toLowerCase())) {
    //     //     uniqueTitles.add(item.title.toLowerCase());
    //     //     return true;
    //     //   }
    //     //   return false;
    //     // });

    //     // console.log(uniqueArr, 'uniqueArr');
    //     //      [
    //     //         {id: 'movie-48997',title: 'Проза бродячих псов: Путешествие в одиночку'}

    //     //         {id: 'movie-95701',  title: 'Проза бродячих псов: Путешествие в одиночку'}

    //     //         {id: 'movie-99083', title: 'Проза бродячих псов: Путешествие в одиночку'}

    //     //         {id: 'movie-76481', title: 'Проза бродячих псов: Путешествие в одиночку'}

    //     //         {id: 'movie-79385',  title: 'В одиночку'}

    //     //         {id: 'movie-20516',  title: 'Прятки в одиночку'}

    //     //         {id: 'serial-2987', title: 'Выпивая в одиночку'}

    //     //         {id: 'serial-43111',  title: 'Выпивая в одиночку'}

    //     //         {id: 'movie-9128',  title: 'В людях'}

    //     //         {id: 'movie-62378',  title: 'В тишине'}

    //     //         {id: 'serial-34006',  title: 'Жизнь не в одиночку'}

    //     //         {id: 'serial-56384',  title: 'Поднятие уровня в одиночку'}

    //     //         {id: 'serial-56386',  title: 'Поднятие уровня в одиночку'}

    //     //         {id: 'serial-56392', title: 'Поднятие уровня в одиночку'}

    //     // { id: 'serial-56402',  title: 'Поднятие уровня в одиночку' }]

    //     // if (related.length !== 0) {
    //     //   for (const item of related) {
    //     //   }
    //     // }

    //     // -------------------------------------------------------
    //     // let pp = arr.filter(
    //     //   (el, ind) =>
    //     //     ind ===
    //     //     arr.findIndex(
    //     //       (elem) => elem.jobid === el.jobid && elem.id === el.id
    //     //     )
    //     // );

    //     // console.log(related, 'related');

    //     // if (related.length !== 0) {
    //     //   // setAnimesItemsSearch([...new Set(related)]);
    //     //   // setAnimesItemsSearch(related);
    //     //   animesItemsSearch = related;
    //     // } else {
    //     //   console.log('не данных для показа');
    //     //   // navigate('/error', { replace: true });
    //     // }

    //     titles = [...new Set(title)];
    //     origTitles = [...new Set(origTitle)];

    //     // const animeLinkVideo= (material[3].link); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

    //     // const title = (titles[0] + '. ' + origTitles[0]);

    //     // countries(params?: CountriesParams): Promise<CountriesResponse>;
    //     // genres(params?: GenresParams): Promise<GenresResponse>;
    //     // list(params?: ListParams): Promise<ListResponse>;
    //     // qualities(params?: QualitiesParams): Promise<QualitiesResponse>;
    //     // qualitiesV2(params?: QualitiesV2Params): Promise<QualitiesV2Response>;
    //     // search(params?: SearchParams): Promise<SearchResponse>;
    //     // translations(params?: TranslationsParams): Promise<TranslationsResponse>;
    //     // translationsV2(params?: TranslationsV2Params): Promise<TranslationsV2Response>;
    //     // years(params?:

    //     // [animesItemsSearchAll, animesItemsSearch]
    //   });

    let uniqueAnimesItems = Object.values(
      animesItemsSearch.reduce((acc, obj) => {
        acc[obj.title] = obj;
        return acc;
      }, {})
    );

    return uniqueAnimesItems; // animesItemsSearch; // as Anime[];data.results;
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
  searchInpVal: string;
  idFullDesc: string;
  randomHederClick: boolean;

  materialData: {
    shikimori_rating: number;
    shikimori_votes: number;

    anime_license_name: string;
    actors: string[];
    all_genres: string;
    anime_status: string;
    anime_studios: string[];
    anime_title: string;
    description: string;
    duration: number;
    episodes_aired: number;
    episodes_total: number;
    minimal_age: number;
    anime_kind: string;
    title: string;
    title_en: string;
    screenshots: string[];
    poster_url: string;
    year: number;
    aired_at: string;
    all_status: string;
    anime_description: string;
    anime_genres: string[];
    next_episode_at: string;
    other_titles: string[];
    other_titles_en: string[];
    other_titles_jp: string[];
    rating_mpaa: string;
  };

  // itemsReindexing: {};

  status: Status;
  error: string | unknown;
  loading: boolean;
}

const initialState: AnimeSearchSliceState = {
  itemsSearch: [],
  searchInpVal: '',
  idFullDesc: '',
  randomHederClick: false,
  materialData: {
    shikimori_rating: 0,
    shikimori_votes: 0,

    anime_license_name: '',
    actors: [],
    all_genres: '',
    anime_status: '',
    anime_studios: [],
    anime_title: '',
    description: '',
    duration: 0,
    episodes_aired: 0,
    episodes_total: 0,
    minimal_age: 0,
    anime_kind: '',
    title: '',
    title_en: '',
    screenshots: [],
    poster_url: '',
    year: 0,
    aired_at: '',
    all_status: '',
    anime_description: '',
    anime_genres: [],
    next_episode_at: '',
    other_titles: [],
    other_titles_en: [],
    other_titles_jp: [],
    rating_mpaa: '',
  },

  // itemsReindexing: {},

  status: Status.LOADING, // loading | success | error
  error: '',
  loading: true,
};

// -----------------------------------store
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setItemsSearch: (state, action: PayloadAction<[]>) => {
      state.itemsSearch = action.payload;
    },
    searchInpHeader: (state, action: PayloadAction<string>) => {
      state.searchInpVal = action.payload;
    },
    clickRandomHeder: (state, action: PayloadAction<boolean>) => {
      state.randomHederClick = action.payload;
    },
    setIdFullDesc: (state, action: PayloadAction<string>) => {
      state.idFullDesc = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
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

export const {
  setItemsSearch,
  searchInpHeader,
  setIdFullDesc,
  clickRandomHeder,
  error,
} = searchSlice.actions;

export const itemsAnimeSearch = (state: RootState) =>
  state.searchSlice.itemsSearch;

export default searchSlice.reducer;
