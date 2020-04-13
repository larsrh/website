const interactiveRender = Symbol.for("interactiveRender");

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
