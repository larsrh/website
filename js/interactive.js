const createButton = ({ icon, label, handler }) => {
  const btn = faButton(icon, label);
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
    {},
    faIcon("exclamation-circle"),
    text(`${err.name}: ${err.message}`)
  )

const renderResult = val => {
  if (val === undefined)
    return text("Evaluated successfully");

  if (val instanceof Element)
    return val;

  if (val.innerHTML !== undefined)
    // probably HTML? Chrome resets the prototype for HTML elements that come out of `eval`
    return val;

  if (Array.isArray(val))
    return html(
      "table",
      {},
      ...val.map((v, i) =>
        html(
          "tr",
          {},
          html("th", {}, text(i)),
          html("td", {}, renderResult(v))
        )
      )
    );

  if (typeof val === "object" && interactiveRender in val)
    return renderResult(val[interactiveRender]());

  if (typeof val === "object")
    return html(
      "table",
      {},
      ...Object.entries(val).map(([k, v]) =>
        html(
          "tr",
          {},
          html("th", {}, text(k)),
          html("td", {}, renderResult(v))
        )
      )
    );

  if (typeof val === "string")
    return html("span", { "class": "output-string" }, text(val))

  if (typeof val === "function")
    return text("ƒ");

  return text(val);
}

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
      out.appendChild(renderResult(val));
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

  const leftContainer = html("div", { "class": "col-md-7" });
  const rightContainer = html("div", { "class": "col-md-5" }, out);

  const row = html("div", { "class": "interactive row", id: `row-${id}` }, leftContainer, rightContainer);

  pre.parentNode.replaceChild(row, pre);

  const code = CodeMirror(leftContainer, {
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
  const resetButton = { icon: "trash", label: "Reset", handler: resetHandler };

  leftContainer.appendChild(html(
    "div",
    { "class": "pull-right" },
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
