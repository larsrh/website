for (const container of document.querySelectorAll("div.video")) {
  const consent = container.querySelector("div.video-consent");
  if (!consent) continue;

  const template = container.querySelector("template");
  container.querySelector("button").onclick = () => {
    container.replaceChildren(template.content.cloneNode(true));
  }
}
