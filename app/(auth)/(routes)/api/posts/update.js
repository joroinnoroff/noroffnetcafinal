import { authFetch } from "../authFetch";
import { API_SOCIAL_URL } from "../constants";

const action = "/posts";
const method = "put";

export async function updatePost(postData) {
  if (!postData.id) {
    throw new Error("Update requires a PostId");
  }

  const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;
  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });

  try {
    if (response.ok) {
      // Successful update, parse and return the response
      const updatedData = await response.json();
      console.log("API Response (Success):", updatedData);
      return updatedData;
    } else {
      // Handle non-successful response (e.g., display an error message)
      const errorData = await response.json();
      console.error(`Update failed with status ${response.status}:`, errorData);
      throw new Error(`Update failed with status ${response.status}`);
    }
  } catch (error) {
    // Handle any other errors (e.g., network issues)
    console.error("Error updating post:", error);
    throw error;
  }
}
