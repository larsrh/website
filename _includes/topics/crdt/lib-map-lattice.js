lattices.map = valueLattice => ({
  join: (map1, map2) => map1.merge(map2, valueLattice.join)
});

lattices.any = {
  join: (x, y) => x >= y ? x : y
};
