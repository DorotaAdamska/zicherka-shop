// action name creator
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* SELECTORS */


/* ACTIONS */


/* INITIAL STATE */
const initialState = [];

/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
      default:
        return statePart;
    }
  };

/* THUNKS */


