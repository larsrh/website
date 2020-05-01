contracts = {};

contracts.partialOrdering = (instance, gen) => ({
  refl:
    fc.property(gen, x => assert.ok(instance.isLeq(x, x))),
  trans:
    fc.property(gen, gen, gen, (x, y, z) => {
      fc.pre(instance.isLeq(x, y));
      fc.pre(instance.isLeq(y, z));
      assert.ok(instance.isLeq(x, z));
    })
})

orderings = {};

orderings.any = {
  isLeq: (x, y) => x <= y
};
