class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.length = 0;
    this.cache = new Map();
    this.head = null;
    this.tail = null;

    this.pushHead = function (node) {
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            return;
        }
        if (node == this.head) return;
        if (node == this.tail) {
            this.tail = node.next;
            node.prev = this.head;
            this.head.next = node;
            this.head = node;
            return;
        }
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        node.prev = this.head;
        this.head.next = node;
        this.head = node;
    };

    this.popTail = function () {
        if (!this.tail) return;
        lrukey = this.tail.key;
        if (this.tail == this.head) {
            delete this.tail;
            delete this.head;
            return lrukey;
        }
        newTail = this.tail.next;
        delete this.tail;
        this.tail = newTail;
        return lrukey;
    };
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (!this.cache.has(key)) return -1;
    node = this.cache.get(key);
    this.pushHead(node);
    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    // Update the value of the key if the key exists.
    if (this.cache.get(key)) {
        node = this.cache.get(key);
        node.value = value;
        this.pushHead(node);
        return;
    }
    // Otherwise, add the key-value pair to the cache. 
    node = new Node(key, value);
    if (this.length >= this.capacity) {
        lrukey = this.popTail();
        this.cache.delete(lrukey);
        this.length -= 1;
    }
    this.pushHead(node);
    this.cache.set(key, node);
    this.length += 1;
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
