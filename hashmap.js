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

  set(key, value) {}
}

let test = new HashMap();
console.log(test.hash("fwefws"));
