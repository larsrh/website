Object.defineProperty(Set.prototype, "isSubsetOf", {
  configurable: true,
  value: function (that) {
    for (const element of this.values())
      if (!that.has(element))
        return false;
    return true;
  }
});
