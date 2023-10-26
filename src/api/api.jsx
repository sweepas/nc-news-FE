import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-news-be-project-lndv.onrender.com/api",
});
export const getArticles = () => {
  return request.get("articles").then((response) => {
    return response.data;
  });
};

export const getArticleById = (article_id) => {
  return request.get(`/articles/${article_id}`).then((response) => {
    return response.data;
  });
};

export const getComments = (article_id) => {
  return request.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data;
  });
};

export const patchArticle = (article_id, votes) => {
  return request
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then((response) => {
      return response.data;
    });
};

export const postComment = (article_id, username, body) => {
  const comment = {
    article_id: article_id,
    username: username,
  };
  const url = `/articles/${article_id}/comments`;
  console.log(comment, url);
  return request.post(url, comment).then((response) => {
    return response.data;
  });
};
