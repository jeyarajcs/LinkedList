class Node{
  constructor(data, next=null){
    this.data = data
    this.next = next
  }
}

class LinkedList{
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(data){
    const node = new Node(data);
    if(!this.head){
      this.head = node;
      this.tail = node;
    }else{ 
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  prepend(data){
    const node = new Node(data);
    if(!this.head){
      this.head = node;
      this.tail = node;
    }else{ 
      node.next = this.head;
      this.head = node;
    }
    this.length++;
  }

  insert(data, index){
    if(index >= this.length){
      this.append(data);
    }
    else if(index == 0){
      this.prepend(data);
    }else{
      const{ prevNode, nextNode } = this.getPrevNextNodes(index);
      const node = new Node(data);
      prevNode.next = node;
      node.next = nextNode;
      this.length++;
    }

  }

  getPrevNextNodes(index){
    let prevNode = this.head;
    let nextNode = prevNode.next;

    for(let i=0; i<index-1; i++){
      prevNode = prevNode.next;
      nextNode = prevNode.next;
    }
    return ({
      prevNode,
      nextNode
    })
  }

  remove(index){
    if(this.length == 0){
      return false
    }
    else{
      const {prevNode, nextNode} = this.getPrevNextNodes(index);
      if(index == 0){
        this.head = nextNode;
      }else if(index == this.length - 1){
        prevNode.next = nextNode.next;
        this.tail = prevNode;
      }else{
        prevNode.next = nextNode.next;
      }
      this.length--;
    }
  }

  search(value){
    if(this.length == 0){
      return -1
    }else{
      let node = this.head;
      for(let i=0; i<this.length; i++){
        if(node.data == value){
          return i;
        }else{
          node = node.next;
        }
      }
      return -1;
    }
  }
}

const list = new LinkedList()
list.prepend(20);
list.append(10);
list.append(25);
list.prepend(30);
list.prepend(40);
list.append(50);
list.insert(33, 8);
list.remove(6);
console.log(JSON.stringify(list,false, '\t'));
console.log(list.search(70));
