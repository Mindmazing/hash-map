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
      value,
      next: null,
    };
    if (!this.#buckets[hash]) {
      this.#buckets[hash] = node;
    } else {
      node.next = this.#buckets[hash];
      this.#buckets[hash] = node;
    }
  }

  get(key) {
    let hash = this.hash(key);
    let parentNode = this.#buckets[hash];
    if (!parentNode) return undefined;
    do {
      if (parentNode.key === key) {
        return parentNode.value;
      }
      parentNode = parentNode.next;
    } while (parentNode);
    return undefined;
  }

  has(key) {
    return this.get(key) ? true : false;
  }

  buckets() {
    return this.#buckets;
  }
}

let test = new HashMap();
