import { ADD_ARTICLE } from "../constants/action-types";

export function addArticle(payload) {
  console.log(".-.")
  return { type: ADD_ARTICLE, payload };
}