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
    if (!this.#buckets[hash]) {
      // if bucket empty add node to bucket
      this.#buckets[hash] = { value: value, next: null };
    } else {
      // if bucket not empty link previous node to new node
      let previousNode = this.#buckets[hash];
      this.#buckets[hash] = {
        value: value,
        next: previousNode,
      };
    }
  }

  buckets() {
    return this.#buckets;
  }
}

let test = new HashMap();
console.log(test.set("Nigga", "Cocksun"));
console.log(test.set("ass", "Cocksun"));

console.log(test.buckets());
