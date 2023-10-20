export function postTemplate(postData) {
  return `<div class="post">${postData}</div`;
}

export function postTemplateB(postData) {
  const post = document.createElement("div");
  post.classList.add("post");
  post.innerText = postData.title;

  return post;
}

export function renderPostTemplate(postData, parent) {
  // parent.innerHTML += postTemplateA (postData)
  parent.append(...postDataList.map(postTemplateB));
}
