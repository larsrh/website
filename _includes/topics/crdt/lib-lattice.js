lattices = {};

lattices.set = {
  join: (x, y) => x.union(y)
};

contracts.lattice = (instance, gen) => ({
  assoc:
    fc.property(gen, gen, gen, (x, y, z) => {
      const x_yz = instance.join(x, instance.join(y, z));
      const xy_z = instance.join(instance.join(x, y), z);
      assert.deepEqual(x_yz, xy_z);
    }),
  commute:
    fc.property(gen, gen, (x, y) => {
      const xy = instance.join(x, y);
      const yx = instance.join(y, x);
      assert.deepEqual(xy, yx);
    }),
  idem:
    fc.property(gen, x => {
      const xx = instance.join(x, x);
      assert.deepEqual(x, x);
    })
});
