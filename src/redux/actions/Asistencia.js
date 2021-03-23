import { LIST_ASSISTANCE, LIST_MY_ASSISTANCE,SAVE_ASSISTANCE } from "../constants/action-types";

export function listAssistance() {
  return function(dispatch) {
    return fetch("https://api.github.com/gists")
      .then(response => response.json())
      .then(json => {
          console.log(json)
        dispatch({ type: LIST_ASSISTANCE, payload: json });
      });
  };
}

export function listMyAssistance() {
    console.log(":________:")
    return function(dispatch) {
      return fetch("https://api.github.com/gists")
        .then(response => response.json())
        .then(json => {
            console.log(json)
          dispatch({ type: LIST_ASSISTANCE, payload: [{ num: 1, time: "8:00:00am" }, { num: 2, time: "1:10:00pm" }] });
        });
    };
  }