const isSubsetOf = (ordering, s1, s2) =>
  s1.every(x1 =>
    s2.some(x2 =>
      ordering.compare(x1, x2) == order.eq
    )
  );

orderings.set = elementOrdering => ({
  compare: (s1, s2) => {
    const s1SubsetOfS2 = isSubsetOf(elementOrdering, s1, s2);
    const s2SubsetOfS1 = isSubsetOf(elementOrdering, s2, s1);

    if (s1SubsetOfS2 && s2SubsetOfS1)
      return order.eq;
    if (s1SubsetOfS2)
      return order.lt;
    if (s2SubsetOfS1)
      return order.gt;

    return order.unknown;
  }
})
