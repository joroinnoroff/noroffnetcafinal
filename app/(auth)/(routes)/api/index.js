import { setRegistererListener as setRegistererListener } from "./register";

import { setLoginFormListener } from "./handlers/login";

import * as listeners from "../api/handlers/index";

import * as templates from "./js/templates/index";
import * as postMethod from "./js/templates/index";
import { renderPostTemplate } from "./js/templates/index";

const path = location.pathname;

if (path === "/profile/login") {
  listeners.setLoginFormListener();
} else if (path === "/profile/register") {
  listeners.setRegistererListener();
} else if (path === "/post/create") {
  listeners.setCreateFormListener();
} else if (path === "/post/editpost") {
  listeners.setUpdatePostListener();
}

async function testTemplate() {
  const posts = await postMethod.getPosts();
  const post = posts();
  const container = document.querySelector("#Post");
  renderPostTemplate(post, container);
}
testTemplate();
