const createButton = handler => {
  const btn = faButton("play", "Run");
  btn.onclick = handler;

  return html(
    "div",
    { "class": "pull-right" },
    btn
  );
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
  if (val instanceof Element)
    return val;

  if (Array.isArray(val))
    return html(
      "ol",
      {},
      ...val.map(i => html("li", {}, renderResult(i)))
    );

  if (typeof val === "object" && interactiveRender in val)
    return text(val[interactiveRender]());

  if (typeof val === "object")
    return html(
      "table",
      {},
      html(
        "tr",
        {},
        html("th", {}, text("Key")),
        html("th", {}, text("Value"))
      ),
      ...Object.entries(val).map(([k, v]) =>
        html(
          "tr",
          {},
          html("td", {}, text(k)),
          html("td", {}, renderResult(v))
        )
      )
    );

  if (typeof val === "function")
    return text("ƒ");

  return text(val);
}

const evalInteractive = (code, iframe, out) => {
  const button = document.getElementById(`row-${out.getAttribute("data-id")}`).querySelector("button");

  button.disabled = true;
  out.setAttribute("class", "output output-pending");
  out.innerHTML = "";
  const promise = promisify(() => iframe.contentWindow.eval(code.getValue()));

  return new Promise(resolve => {
    setTimeout(() => {
      promise
        .then(val => {
          out.setAttribute("class", "output output-success");
          out.appendChild(renderResult(val));
        })
        .catch(err => {
          out.setAttribute("class", "output output-failure");
          out.appendChild(renderError(err));
        })
        .finally(() => {
          button.removeAttribute("disabled");
          resolve();
        });
    }, 500);
  });
}

const initInteractive = async (extraScripts) => {
  const iframe = await createIframe(extraScripts);

  const actions = [];

  let counter = 0;

  for (const pre of document.querySelectorAll("pre")) {
    const id = counter++;

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

    const handler = () => evalInteractive(code, iframe, out);
    leftContainer.appendChild(createButton(handler));

    actions.push(handler);
  }

  for (const action of actions)
    await action();
}
