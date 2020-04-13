order = {};

class Order {
  constructor(state) {
    this.state = state;
    Object.freeze(this);
  }

  flip() {
    switch (this.state) {
      case "lt":
        return order.gt;
      case "gt":
        return order.lt;
      default:
        return this;
    }
  }

  get isLeq() {
    return this == order.lt || this == order.eq;
  }

  get isGeq() {
    return this == order.gt || this == order.eq;
  }

  [interactiveRender]() {
    return this.state || "unknown";
  }
}

order.lt = new Order("lt");
order.eq = new Order("eq");
order.gt = new Order("gt");
order.unknown = new Order();

// all the different orders
Object.values(order)
