import { authFetch } from "../authFetch";
import { API_SOCIAL_URL } from "../constants";

const action = "/posts?_author=true&_reactions=true&_comments=true";

export async function getPosts() {
  const updatePostURL = `${API_SOCIAL_URL}${action}`;
  const response = await authFetch(updatePostURL);

  if (!response.ok) {
    throw new Error("Failed to fetch posts All of em");
  }

  return await response.json();
}

export async function getPost(id) {
  if (!id) {
    throw new Error("Get requires a PostId");
  }

  const getPostURL = `${API_SOCIAL_URL}${action}/${id}`;
  const response = await authFetch(getPostURL);

  if (!response.ok) {
    throw new Error(`Failed to fetch post with ID ${id}`);
  }

  console.log(response);
  return await response.json();
}
