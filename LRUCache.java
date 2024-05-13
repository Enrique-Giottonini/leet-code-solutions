class LRUCache {
    class Node {
        public int key, value;
        public Node next, prev;

        public Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private int capacity, count;
    private Node[] cache;
    private Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new Node[10_000 + 1];
        this.count = 0;
    }

    public int get(int key) {
        Node node = cache[key];
        if (node == null) {
            return -1;
        }
        pushToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node node = cache[key];
        if (node != null) {
            node.value = value;
            pushToHead(node);
            return;
        }
        node = new Node(key, value);
        if (count >= capacity) {
            int lrukey = popTail();
            cache[lrukey] = null;
            count--;
        }
        cache[key] = node;
        pushToHead(node);
        count++;
    }

    private void pushToHead(Node node) {
        if (head == null || tail == null) {
            head = node;
            tail = node;
            tail.next = tail;
            return;
        }
        if (head == node)
            return;
        if (tail == node) {
            head.next = node;
            node.prev = head;
            tail = node.next;
            node.next = null;
            head = node;
            return;
        }
        if (node.prev != null)
            node.prev.next = node.next;
        if (node.next != null)
            node.next.prev = node.prev;
        node.next = null;
        node.prev = head;
        head.next = node;
        head = node;
    }

    private int popTail() {
        if (tail == null)
            return -1;
        if (tail == head) {
            int lrukey = tail.key;
            head = null;
            tail = null;
            return lrukey;
        }
        int lrukey = tail.key;
        tail = tail.next;
        return lrukey;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
