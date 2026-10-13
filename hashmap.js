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
    let hash = this.hash(key);
    let node = {
      key,
      data: value,
      next: null,
    };
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
        console.log("key found");
        console.log(parentNode.next);
        console.log(parentNode.next.next);
        parentNode.next = parentNode.next.next;
        console.log(parentNode);
        return;
      }
      parentNode = parentNode.next;
    } while (parentNode);
  }

  buckets() {
    return this.#buckets;
  }
}

let test = new HashMap();
