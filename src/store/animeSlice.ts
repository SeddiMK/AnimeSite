import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { Axios } from 'axios';
import { RootState } from '.';
// kodik---------------------------------------------------------------------
import { kodikApiKey } from '../kodikcfg';
// import { Client, MaterialObject, VideoLinks } from 'kodikwrapper';

export type AnimeParams = {
  limitPar: number;
  yearNew: string | number;
};

export type AnimeItems = {
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

export const fetchAnimeListSlice = createAsyncThunk<AnimeItems[], AnimeParams>(
  'anime/fetchAnimeStatus',
  async (params) => {
    try {
      const { limitPar, yearNew } = params;

      // console.log(
      //   `http://kodikapi.com/list?limit=${limitPar}&type='anime-serial'${yearNew}&with_material_data=true&token=kodikApiKey}`
      // );

      // {
      //   "version": 2,
      //   "builds": [
      //     {
      //       "src": "./index.js",
      //       "use": "@vercel/node"
      //     }
      //   ],
      //   "routes": [
      //     {
      //       "src": "/(.*)",
      //       "dest": "./index.js",
      //       "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      //       "headers": {
      //         "Access-Control-Allow-Origin": "*"
      //       }
      //     }
      //   ],

      //   "headers": [
      //     {
      //       "source": "/manifest.webmanifest",
      //       "headers": [{ "key": "Access-Control-Allow-Origin", "value": "*" }]
      //     }
      //   ],

      //   "rewrites": [
      //     {
      //       "source": "http://kodikapi.com",
      //       "destination": "https://react-anime-ev7sno3d8-maxs-projects-4db4b9f2.vercel.app"
      //     }
      //   ]
      // }

      // Listen on a specific host via the HOST environment variable
      // var host = process.env.HOST || 'http://kodikapi.com';
      // // Listen on a specific port via the PORT environment variable
      // var port = process.env.PORT || 3000;

      // var cors_proxy = require('cors-anywhere');
      // cors_proxy
      //   .createServer({
      //     originWhitelist: [], // Allow all origins
      //     requireHeader: ['origin', 'x-requested-with'],
      //     removeHeaders: ['cookie', 'cookie2'],
      //   })
      //   .listen(port, host, function () {
      //     console.log('Running CORS Anywhere on ' + host + ':' + port);
      //   });

      // https://cors-anywhere.herokuapp.com/
      const resp: any = await axios.get<AnimeItems[]>(
        `http://kodikapi.com/list?limit=${limitPar}&type='anime-serial'${yearNew}&with_material_data=true&token=${kodikApiKey}`
      );

      // const myRequest = new Request(url, conf);
      // let data;
      // const resp: any = fetch(url, conf)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log(data);
      //     console.log(data.results);
      //     data = data.results;
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });

      // if (resp.status !== 200) {
      //   throw new Error('Server Error!');
      // }
      const data = resp.data.results;
      console.log(resp);
      console.log(data);
      // console.log(data, '------------data list------------');

      // let animesItems: MaterialObject[] = [];
      let titles: string[] = [];
      let origTitles: string[] = [];
      let animesItems: AnimeItems[] = [];
      let animesItemsNotTest: AnimeItems[] = [];
      // let animesItemsSearchAll: AnimeSearch[] = [];
      let prevTitle: string | null = null;
      let prevId: string | null = null;

      // filter uniq
      // const seen = new Set();
      // const uniqueObjects = objects.filter(obj => {
      //     if (seen.has(obj.title)) {
      //         return false;
      //     } else {
      //         seen.add(obj.title);
      //         return true;
      //     }
      // });

      if (data.length !== 0) {
        // let prevTitle: string | null = material[0].title; // && item.title.toLowerCase() !==
        for (const item of data) {
          if (
            (item.type === 'anime' || item.type === 'anime-serial') &&
            item.title.toLowerCase() !== prevTitle
          ) {
            animesItems.push(item);
          } else {
            animesItemsNotTest.push(item);
          }

          prevTitle = item.other_title;
          prevId = item.id;
        }
      } else {
        console.log('нет данных для показа');
      }
      // ----------- client kodik ----------------------------------------------------
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
      console.log();
      // -----------------------------------------------------------------------------------------------
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
      // -----------------------------------------------------------------------------------------------

      let uniqueAnimesItems = Object.values(
        animesItems.reduce((acc, obj) => {
          acc[obj.title] = obj;
          return acc;
        }, {})
      );
      return uniqueAnimesItems; //animesItems as AnimeItems[];
    } catch (error) {
      return error.message; //rejectWithValue(
    }
  }
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface AnimeSliceState {
  itemsList: AnimeItems[];

  status: Status;
  error: string | unknown;
  loading: boolean;
}

const initialState: AnimeSliceState = {
  itemsList: [],

  status: Status.LOADING, // loading | success | error
  error: '',
  loading: true,
};

// -----------------------------------store
const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    // setItems: (state, action: PayloadAction<[]>) => {
    //   state.itemsList = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAnimeListSlice.pending, (state) => {
      state.status = Status.LOADING;
      state.loading = true;
      state.itemsList = [];
    });
    builder.addCase(fetchAnimeListSlice.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.itemsList = action.payload;
      state.loading = false;

      // if (state.itemsList.length > 1) {
      //   // setItemsReindexing -----------------------------------
      //   state.itemsList.reduce<{}>((accum: any, item: any) => {
      //     accum[item.articul] = item;
      //     return (state.itemsReindexing = accum);
      //   }, {});
      // }
    });

    builder.addCase(fetchAnimeListSlice.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload;
      state.itemsList = [];
      state.loading = false;
    });
  },
});

export const itemsAnime = (state: RootState) => state.animeSlice.itemsList;

export default animeSlice.reducer;
