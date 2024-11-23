class SongNode {
  constructor(data, next = null, prev = null) {
    this.prev = prev;
    this.next = next;
    this.data = data;
  }
}

export default SongNode;
