contracts = {};

contracts.partialOrdering = (instance, gen) => ({
  refl:
    fc.property(gen, x => assert.equal(instance.compare(x, x), order.eq)),
  trans:
    fc.property(gen, gen, gen, (x, y, z) => {
      fc.pre(instance.compare(x, y).isLeq);
      fc.pre(instance.compare(y, z).isLeq);
      assert.ok(instance.compare(x, z).isLeq);
    }),
  flip:
    fc.property(gen, gen, (x, y) =>
      assert.equal(instance.compare(x, y).flip(), instance.compare(y, x))
    )
})

orderings = {};

orderings.any = {
    compare: (x, y) => x < y ? order.lt : x == y ? order.eq : order.gt
};
