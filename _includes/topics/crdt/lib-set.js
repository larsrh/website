Set.prototype.isSubsetOf = function (that) {
  for (const element of this.values())
    if (!that.has(element))
      return false;
  return true;
}
