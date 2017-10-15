// The trie implementation
// Credit : alexandervasyuk (https://gist.github.com/alexandervasyuk/b12c3d2c306539decb2a#file-trie-js)
function Trie() {
	this.head = {
			key : ''
		, children: {}
	}
}

Trie.prototype.add = function(key) {

	var curNode = this.head
		, newNode = null
		, curChar = key.slice(0,1);

	key = key.slice(1);
	
	while(typeof curNode.children[curChar] !== "undefined" 
		&& curChar.length > 0){
		curNode = curNode.children[curChar];
		curChar = key.slice(0,1);
		key = key.slice(1);
	}

	while(curChar.length > 0) {
		newNode = {
				key : curChar
			, value : key.length === 0 ? null : undefined
			, children : {}
		};

		curNode.children[curChar] = newNode;

		curNode = newNode;

		curChar = key.slice(0,1);
		key = key.slice(1);
	}

};

Trie.prototype.search = function(key) {
	var curNode = this.head
		, curChar = key.slice(0,1)
		, d = 0;

	key = key.slice(1);

	while(typeof curNode.children[curChar] !== "undefined" && curChar.length > 0){
		curNode = curNode.children[curChar];
		curChar = key.slice(0,1);
		key = key.slice(1);
		d += 1;
	}

	if (curNode.value === null && key.length === 0) {
		return d;
	} else {
		return -1;
	}

}

Trie.prototype.remove = function(key) {
	var d = this.search(key);
	if (d > -1){
		removeH(this.head, key, d);
	}
}

function removeH(node, key, depth) {
	if (depth === 0 && Object.keys(node.children).length === 0){
		return true;
	} 

	var curChar = key.slice(0,1);

	if (removeH(node.children[curChar], key.slice(1), depth-1)) {
		delete node.children[curChar];
		if (Object.keys(node.children).length === 0) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

// Fetch the trie and search a word
$.ajax({
  url: "https://raw.githubusercontent.com/duke79/GreaseMonkeyScripts/master/Barron's%204525%20Trie.json",
  dataType: "text",
  success: function (data) {       
    //console.log(data.substr(1,data.length-3));
    var theTrie = new Trie();
    theTrie.head = JSON.parse(data.substr(1,data.length-3)).head;
    console.log(theTrie.search("frugality"));
  }
});
