set = (...elems) => new Set(elems);

Object.defineProperty(Set.prototype, "union", {
  configurable: true,
  value: function (that) {
    return set(...this.values(), ...that.values());
  }
});
