import { useReducer, useEffect } from "react";
import axios from "axios";

const BASE_URL =
  "https://api.allorigins.win/raw?url=https://jobs.github.com/positions.json";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  UPDATE_HAS_NEXT_PAGE: "update_has_next_page",
};

const reducer = (currstate, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { jobs: [], loading: true };
    case ACTIONS.GET_DATA:
      return {
        ...currstate,
        jobs: action.payload.jobs,
        loading: false,
      };
    case ACTIONS.ERROR:
      return { ...currstate, jobs: [], error: action.payload.error };
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...currstate, hasNextPage: action.payload.hasNextPage };
    default:
      return currstate;
  }
};

export const useFetchJobs = (params, page) => {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
  });
  // console.log(state);

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    const cancelToken2 = axios.CancelToken.source();

    dispatch({ type: ACTIONS.MAKE_REQUEST });

    axios
      .get(BASE_URL, {
        cancelToken: cancelToken1.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    // checking if there is another page for pagination
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken2.token,
        params: { markdown: true, page: page + 1, ...params },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
};

// for too many requests. i do not know how this works
// add before api call just like heroku
// https://api.allorigins.win/raw?url=
