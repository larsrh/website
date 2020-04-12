---
title: "CRDTs: Intro (2)"
subtitle: "Part 2: Algebras & contracts"
---

⚠ **Under construction** ⚠


## Order! Orderrrr!

```
partiallyOrderedContract = (instance, gen) => ({
    validResult:
        fc.property(gen, gen, (x, y) =>
            assert.oneOf(instance.compare(x, y), ["lt", "eq", "gt"])
        ),
    refl:
        fc.property(gen, x =>
            assert.strictEqual(instance.compare(x, x), "eq")
        ),
    trans:
        fc.property(gen, gen, gen, (x, y, z) => {
            fc.pre(instance.compare(x, y) == "lt");
            fc.pre(instance.compare(y, z) == "lt");
            assert.strictEqual(instance.compare(x, z), "lt");
        })
})

anyPartiallyOrdered = {
    compare: (x, y) => x < y ? "lt" : x == y ? "eq" : "gt"
};
```

```
checkAll(partiallyOrderedContract(anyPartiallyOrdered, fc.integer()));
```

```
checkAll(partiallyOrderedContract(anyPartiallyOrdered, fc.string()));
```
