const trimMax = (str, len) => {
  if (str.length > len)
    return str.substr(0, len) + " ...";
  else
    return str;
}

const processResult = ({ failed, numRuns, error, counterexample }) => {
  if (counterexample)
    counterexample = [
      text("Counterexample: "),
      html("span", { style: "white-space: pre;" }, text(`"${counterexample}"`))
    ]
  else
    counterexample = [];

  if (failed)
    return html(
      "div",
      {},
      html(
        "div",
        {},
        faIcon("exclamation-circle"),
        text("Failure")
      ),
      html(
        "div",
        {},
        text(trimMax(error, 50))
      ),
      html(
        "div",
        {},
        ...counterexample
      )
    );
  else
    return html(
      "span",
      {},
      faIcon("check-circle"),
      text(`Success: ${numRuns} inputs tested`)
    );
}

const checkAll = async props => Object.fromEntries(await Promise.all(
  Object.entries(props).map(async ([key, value]) =>
    [key, processResult(await Promise.resolve(fc.check(value)))]
  )
));

const assert = chai.assert;
