Set.prototype[interactiveRender] = function () {
  if (this.size === 0)
    return html("span", {}, text("Empty set"));

  return html(
    "table",
    {},
    html(
      "tr",
      {},
      html("th", {}, text("Set entry"))
    ),
    ...Array.from(this.values()).map(e =>
      html(
        "tr",
        {},
        html("td", { }, render(e))
      )
    )
  );
}

Map.prototype[interactiveRender] = function () {
  if (this.size === 0)
    return html("span", {}, text("Empty map"));

  return html(
    "table",
    {},
    html(
      "tr",
      {},
      html("th", {}, text("Key")),
      html("th", {}, text("Value"))
    ),
    ...Array.from(this.entries()).map(([k, v]) =>
      html(
        "tr",
        {},
        html("td", { }, render(k)),
        html("td", { }, render(v))
      )
    )
  );
}
