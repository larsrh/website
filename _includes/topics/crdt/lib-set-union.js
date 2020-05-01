set = (...elems) => new Set(elems);

Set.prototype.union = function (that) {
  return set(...this.values(), ...that.values());
}
