// LoginForm.js

import { redirect } from "next/dist/server/api-utils";
import { login } from "../../../login/index.js";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    // Send it to the API
    login(profile);
    router.push("/post");
  });
}
