const trimMax = (str, len) => {
  if (str.length > len)
    return str.substr(0, len) + " ...";
  else
    return str;
}

const success = numRuns =>
  html(
    "span",
    { "class": "success" },
    text(`Success: ${numRuns} inputs tested`)
  );

const failure = (error, counterexample) => {
  if (counterexample)
    counterexample = {
      "Counterexample": counterexample
    };
  else
    counterexample = {};

  return {
    "Status": html(
      "span",
      { "class": "error" },
      text("Failure")
    ),
    "Message": trimMax(error || "", 50),
    ...counterexample
  };
}

const processResult = ({ failed, numRuns, error, counterexample }) => {
  if (failed)
    return failure(error, counterexample);
  else
    return success(numRuns);
}

const fc = fastcheck;

const checkAll = async props => Object.fromEntries(await Promise.all(
  Object.entries(props).map(async ([key, value]) =>
    [key, processResult(await Promise.resolve(fc.check(value)))]
  )
));

const sample = gen => fc.sample(gen).slice(0, 10);

const assert = chai.assert;
