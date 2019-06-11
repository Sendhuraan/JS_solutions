(function() {

	class Node {
		constructor(data) {
			this.data = data;
			this.next = null;
		}
	}

	class SinglyLinkedList {

		constructor() {
			this.head = null;
			this.tail = null;
			this.length = 0;
		}

		push(data) {
			var newNode = new Node(data);

			if(!this.head) {
				this.head = newNode;
				this.tail = this.head;
			}
			else {
				this.tail.next = newNode;
				this.tail = newNode;
			}

			this.length++;

			return this;
		}

		pop() {

			if(!this.head) {
				return undefined;
			}
			else {
				var currentNode = this.head;
				var previousNode = currentNode;

				while(currentNode.next) {
					previousNode = currentNode;
					currentNode = currentNode.next;
				};

				this.tail = previousNode;
				this.tail.next = null;
				this.length--;

				if(this.length === 0) {
					this.head = null;
					this.tail = null;
				}

				return currentNode;
			}

		}

		shift() {

			if(!this.head) {
				return undefined;
			}
			else {
				var currentNode = this.head;
				this.head = currentNode.next;
				this.length--;

				if(this.length === 0) {
					this.tail = null;
				}

				return currentNode;
			}
		}

		unshift(data) {

			var newNode = new Node(data);

			if(!this.head) {
				this.head = newNode;
				this.tail = this.head;
			}
			else {
				newNode.next = this.head;
				this.head = newNode;
			}
			
			this.length++;

			return this;
		}

		get(index) {

			if(index < 0 || index >= this.length) {
				return null;
			}
			else {
				var counter = 0;
				var currentNode = this.head;

				while(counter !== index) {
					currentNode = currentNode.next;
					counter++;
				}

				return currentNode;
			}
			
		}

		set(index, data) {
			var getNode = this.get(index);

			if(getNode) {
				getNode.data = data;
				return true;
			}
			else {
				return false;
			}
		}

		insert(index, data) {
			if(index < 0 || index > this.length) {
				return false;
			}
			else if(index === this.length) {
				return this.push(data);
			}
			else if(index === 0) {
				return this.unshift(data);
			}
			else {
				var newNode = new Node(data);

				var previousNodeToIndex = this.get(index - 1);
				previousNodeToIndex.next = newNode; 

				var currentNodeAtIndex = previousNodeToIndex.next;
				newNode.next = currentNodeAtIndex;
			}
		}
	}

	var publicAPI = {
		Singly: SinglyLinkedList
	}

	module.exports = publicAPI;
	
})();