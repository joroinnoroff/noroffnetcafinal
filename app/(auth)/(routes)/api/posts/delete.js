import { authFetch } from "../authFetch";
import { API_SOCIAL_URL } from "../constants";

const action = "/posts";
const method = "delete";

export async function removePosts(id) {
  if (!id) {
    throw new Error("Delete requires a PostId");
  }

  const updatePostURL = `${API_SOCIAL_URL}${action}/${id}`;
  const response = await authFetch(updatePostURL, {
    method,
  });
  return await response.json();
}
