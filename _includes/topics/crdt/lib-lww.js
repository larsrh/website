LWWRegister = class {
  constructor(value, time) {
    this.value = value;
    if (!time)
      time = new Date();
    this.time = time;
  }

  set(value) {
    this.value = value;
    this.time = new Date();
    return this;
  }

  clone() {
    return new LWWRegister(this.value, this.time);
  }

  [interactiveRender]() {
    return {
      value: this.value,
      time: this.time.getTime()
    };
  }
}
