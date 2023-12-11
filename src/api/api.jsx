import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-news-be-project-lndv.onrender.com/api",
});

export const getArticles = (query, sortOption) => {
  const url = "articles";

  const params = {};

  if (!(query === "null")) {
    params.topic = query;
  }

  if (sortOption) {
    params.sortby = sortOption;
  }
  console.log(params);
  return request.get(url, { params }).then((response) => {
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
    body: body,
    username: username,
  };
  const url = `/articles/${article_id}/comments`;
  return request.post(url, comment).then((response) => {
    return response;
  });
};
export const getTopics = () => {
  return request.get("/topics").then((response) => {
    return response.data;
  });
};

export const deleteComment = (comment_id) => {
  return request.delete(`/comments/${comment_id}`).then((response) => {
    return response;
  });
};

export const addNewArticle = (
  articleText,
  articleTopics,
  title,
  authUser,
  imgUrl
) => {
  const body = {
    author: authUser,
    title: title,
    body: articleText,
    article_img_url: imgUrl,
    topic: articleTopics,
  };
  const url = `/articles/`;
  return request.post(url, body).then((response) => {
    return response;
  });
};

export const removeArticle = (article_id) => {
  const url = `/articles/${article_id}`;
  return request.delete(url).then((response) => {
    return response;
  });
};

export const addNewTopic = (slug, description) => {
  const url = `/topics`;
  const newTopic = { slug: slug, description: description };
  console.log(newTopic);
  return request.post(url, newTopic).then((response) => {
    return response;
  });
};

export const patchComment = (comment_id, inc_votes) => {
  const url = `/comments/${comment_id}`
  return request.patch(url, inc_votes).then((response)=>{
    console.log(response);
    return response
  })
}