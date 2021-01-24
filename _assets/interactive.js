const createButton = ({ icon, label, handler }) => {
  const btn = html(
    "button",
    { "class": icon },
    text(label)
  );
  btn.onclick = handler;
  return btn;
}

const createIframe = async extraScripts => {
  const body = document.querySelector("body");

  // check existing iframe
  let iframe = document.getElementById("interactive");
  if (iframe)
    body.removeChild(iframe);

  iframe = html(
    "iframe",
    {
      "class": "interactive",
      "id": "interactive"
    }
  );

  await new Promise(resolve => {
    iframe.onload = resolve;
    body.appendChild(iframe);
  });

  const head = iframe.contentWindow.document.querySelector("head");

  for (const extra of extraScripts) {
    const s = html("script", { src: extra });
    await new Promise(resolve => {
      s.onload = resolve;
      head.appendChild(s);
    })
  }

  return iframe;
}

const promisify = f => {
  try {
    const res = f();
    return Promise.resolve(res);
  }
  catch (err) {
    return Promise.reject(err);
  }
}

const renderError = err =>
  html(
    "span",
    { "class": "error" },
    text(`${err.name}: ${err.message}`)
  )

const setButtons = (id, enabled) => {
  const buttons = document.getElementById(`row-${id}`).querySelectorAll("button");

  for (const button of buttons)
    if (enabled)
      button.removeAttribute("disabled");
    else
      button.disabled = true;
}

const evalInteractive = (code, iframe, out) => {
  const id = out.getAttribute("data-id");

  setButtons(id, false);

  out.setAttribute("class", "output output-pending");
  out.innerHTML = "";
  const promise = promisify(() => iframe.contentWindow.eval(code.getValue()));

  return promise
    .then(val => {
      out.setAttribute("class", "output output-success");
      out.appendChild(render(val));
    })
    .catch(err => {
      out.setAttribute("class", "output output-failure");
      console.dir(err);
      out.appendChild(renderError(err));
      return Promise.resolve();
    })
    .finally(() => {
      setButtons(id, true);
    });
}

const initSnippet = (iframe, pre, id) => {
  const contents = pre.textContent.trim();

  const out = html("div", { "class": "output output-pending", "data-id": id });

  const editorContainer = html("div", { });
  const outputContainer = html("div", { }, out);

  const row = html("div", { "class": "interactive", id: `row-${id}` }, editorContainer, outputContainer);

  pre.parentNode.replaceChild(row, pre);

  const code = CodeMirror(editorContainer, {
    value: contents,
    mode: "javascript",
    lineNumbers: true,
    viewportMargin: Infinity
  });

  const runHandler = () => evalInteractive(code, iframe, out);
  const resetHandler = () => {
    code.setValue(contents);
    runHandler();
  }

  const runButton = { icon: "play", label: "Run", handler: runHandler };
  const resetButton = { icon: "reset", label: "Reset", handler: resetHandler };

  editorContainer.appendChild(html(
    "div",
    { "class": "interactive-buttons" },
    createButton(resetButton),
    createButton(runButton)
  ));

  return runHandler;
}

const initInteractive = async extraScripts => {
  const iframe = await createIframe(extraScripts);

  let counter = 0;

  const actions =
    Array.from(document.querySelectorAll("pre"))
      .map(pre => initSnippet(iframe, pre, counter++));

  for (const action of actions)
    await action();
}
