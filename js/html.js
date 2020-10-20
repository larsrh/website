const interactiveRender = Symbol.for("interactiveRender");

const render = val => {
  if (val === undefined)
    return text("Evaluated successfully");

  if (val instanceof Element)
    return val;

  if (val.innerHTML !== undefined)
    // probably HTML? Chrome resets the prototype for HTML elements that come out of `eval`
    return val;

  if (Array.isArray(val)) {
    if (val.length === 0)
      return html("span", {}, text("Empty array"));

    return html(
      "table",
      {},
      ...val.map((v, i) =>
        html(
          "tr",
          {},
          html("th", {}, text(i)),
          html("td", {}, render(v))
        )
      )
    );
  }

  if (typeof val === "object" && interactiveRender in val)
    return render(val[interactiveRender]());

  if (typeof val === "object")
    return html(
      "table",
      {},
      ...Object.entries(val).map(([k, v]) =>
        html(
          "tr",
          {},
          html("th", {}, text(k)),
          html("td", {}, render(v))
        )
      )
    );

  if (typeof val === "string")
    return html("span", { "class": "output-string" }, text(val))

  if (typeof val === "function")
    return text("ƒ");

  return text(val);
}

const html = (tag, props, ...children) => {
  props = props || {};

  const element = document.createElement(tag);
  for (const [k, v] of Object.entries(props))
    element.setAttribute(k, v);
  children.forEach(child => element.appendChild(child));

  return element;
}

const text = content => document.createTextNode(content)

const faIcon = icon =>
  html(
    "i",
    {
      "class": `fa fa-fw fa-${icon}`,
      "aria-hidden": "true"
    }
  )

const faButton = (icon, label) =>
  html(
    "button",
    { "class": "btn btn-primary" },
    faIcon(icon),
    text(label)
  )
