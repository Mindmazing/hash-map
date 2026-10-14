class HashMap {
  #buckets;

  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.#buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashcode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashcode = (primeNumber * hashcode + key.charCodeAt(i)) % this.capacity;
    }
    return hashcode;
  }

  set(key, value) {
    // increase capacity
    if (this.length() >= this.capacity * this.loadFactor) {
      this.capacity *= 2; // double capacity
      this.#buckets.length = this.capacity;
    }

    let hash = this.hash(key);
    let node = {
      key,
      data: value,
      next: null,
    };

    if (this.has(key)) {
      let keyNode = this.#buckets[hash].next;
      while (keyNode) {
        if (keyNode.key === key) {
          keyNode.data = node.data;
          return;
        }
        keyNode = keyNode.next;
      }
    }

    if (!this.#buckets[hash]) {
      this.#buckets[hash] = { data: "HEAD", next: node };
    } else {
      node.next = this.#buckets[hash].next;
      this.#buckets[hash].next = node;
    }
  }

  get(key) {
    let hash = this.hash(key);
    let node = this.#buckets[hash];
    if (!node) return undefined;

    do {
      if (node.key === key) {
        return node.data;
      }
      node = node.next;
    } while (node);
    return undefined;
  }

  has(key) {
    return this.get(key) ? true : false;
  }

  remove(key) {
    if (!this.has(key)) return false;

    // search key
    let hash = this.hash(key);
    let parentNode = this.#buckets[hash];
    do {
      // if key found, point parent node next to childs next node
      if (parentNode.next.key === key) {
        parentNode.next = parentNode.next.next;
        return;
      }
      parentNode = parentNode.next;
    } while (parentNode);
  }

  length() {
    let total, node;
    return this.#buckets.reduce((acc, curr) => {
      if (!curr) {
        return acc;
      }
      // loop inside current
      node = curr.next;
      total = 0;
      while (node) {
        total++;
        node = node.next;
      }
      return acc + total;
    }, 0);
  }

  clear() {
    this.#buckets.length = 0;
    this.#buckets.length = 16;
  }

  keys() {
    let keys = [];
    let node;
    this.#buckets.forEach((element) => {
      if (element) {
        node = element.next;
        while (node) {
          keys.push(node.key);
          node = node.next;
        }
      }
    });
    return keys;
  }

  values() {
    let values = [];
    let node;
    this.#buckets.forEach((element) => {
      if (element) {
        node = element.next;
        while (node) {
          values.push(node.data);
          node = node.next;
        }
      }
    });
    return values;
  }

  entries() {
    let entries = [];
    let node;
    this.#buckets.forEach((element) => {
      if (element) {
        node = element.next;
        while (node) {
          entries.push([node.key, node.data]);
          node = node.next;
        }
      }
    });
    return entries;
  }

  buckets() {
    return this.#buckets;
  }
}

let test = new HashMap();
