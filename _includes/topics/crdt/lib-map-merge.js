Map.prototype.merge = function (that, valueMerger) {
  const result = new Map(this.entries());
  for (const [key, value] of that.entries()) {
    if (result.has(key))
      result.set(key, valueMerger(result.get(key), value));
    else
      result.set(key, value);
  }
  return result;
}
