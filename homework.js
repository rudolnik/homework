/*
7) Написать класс, реализующий список. Предусмотреть методы поиска, вставки, удаления,
   изменения элемента и определения длины списка.
*/
class MyList {
  constructor(...item) {
    this.list = [...item]
  }

  search(element) {
    return this.list.some((el) => el === element);
  }

  insert(element, index) {
    this.list.splice(index, 0, element);
    return this.list
  }

  delete(element) {
    this.list = this.list.filter((el) => el != element)
    return this.list
  }

  update(element, newElement) {
    const index = this.list.indexOf(element)
    if(index >= 0) {
      this.list.splice(index, 1, newElement);
    }
    return this.list
  }

  length() {
    return this.list.length
  }

}

let mylist = new MyList(1, '2','five')

console.log(mylist.list)
console.log(mylist.search(2))
console.log(mylist.insert('book', -5))
console.log(mylist.delete('five'))
console.log(mylist.update('2', 'five'))
console.log('Длина списка: ' + mylist.length())

/*
1) Написать класс, реализующий двусвязный список. 
   Предусмотреть методы поиска, вставки, удаления, изменения элемента и определения длины списка.
*/

class DoublyLinkedList {
  constructor(...item) {
    this.list = this._createList([...item])
  }

  _createList(array) {
    const newArray = []
    for(let i = 0; i <= array.length - 1; i++) {
      if(i == 0) {
        newArray.push({'previous': null, 'next': array[i+1], 'value': array[i]})
      }
      else if (i == array.length - 1) {
        newArray.push({'previous': array[i-1], 'next': null, 'value': array[i]})
      }
      else {
        newArray.push({'previous': array[i-1], 'next': array[i+1], 'value': array[i]})
      }
    }
    return newArray
  }

  search(element) {
    return this.list.filter((el) => el.value === element)[0];
  }

  insert(element, index) {
    if(index >= 1 && index < this.list.length - 1) {
      this.list.splice(index, 0, {'previous': this.list[index-1].value, 'next': this.list[index].value, 'value': element});
      this.list[index-1].next = element
      this.list[index+1].previous = element
    }
    else if(index >= this.list.length - 1) {
      this.list.push({'previous': this.list[this.list.length - 1].value, 'next': null, 'value': element})
      this.list[this.list.length - 1 - 1].next = element
    }
    else {
      this.list.splice(0, 0, {'previous': null, 'next': this.list[0].value, 'value': element});
      this.list[1].previous = element
    }
    
    return this.list
  }

  delete(element) {
    
    let index = this.list.findIndex((el) => el.value === element)
    if(index === -1)
      return this.list

    if(index >= 1 && index < this.list.length - 1) {
      this.list.splice(index, 1);
      this.list[index-1].next = this.list[index].value
      this.list[index].previous = this.list[index-1].value
    }
    else if(index >= this.list.length - 1) {
      this.list.splice(index, 1);
      this.list[index-1].next = null
    }
    else {
      this.list.splice(index, 1);
      this.list[0].previous = null
    }
    
    return this.list
  }

  update(element, newElement) {
    let index = this.list.findIndex((el) => el.value === element)
    if(index === -1)
      return this.list

    this.list[index].value = newElement

    if(index >= 1 && index < this.list.length - 1) {
      this.list[index-1].next = newElement
      this.list[index+1].previous = newElement
    }
    else if(index == 0) {
      this.list[index+1].previous = newElement
    }
    
    return this.list
  }

  length() {
    return this.list.length
  }
}

let doublyLinkedList = new DoublyLinkedList(1, '2','five')

console.log(doublyLinkedList.list)
console.log(doublyLinkedList.search('2'))
console.log(doublyLinkedList.insert('5', -5))
console.log(doublyLinkedList.delete('5'))
console.log(doublyLinkedList.update(1, '4'))
console.log('Длина списка: ' + doublyLinkedList.length())