var justin = require('../justin.js');
var events = require("events");

var TOPIC_PREFIX = 'topic';

var topic_counter = 0;
function newId() {
	return ++topic_counter;
}

function Topic(topicId) {
	events.EventEmitter.call(this);
	
	var instance = this;
	
	this.pubId = topicId;
	if (!topicId) {
		this.pubId = newId();
	} 
	
	this._id = [TOPIC_PREFIX, /*process.pid, */this.pubId].join('_');
	
	this.killTopic = function () {
		justin.Justin.storage.delete(instance._id, function(error, result){
			
		});
	};
	
	this.storeData = function (serializedData) {
		var topic = instance;
		justin.Justin.storage.set(instance._id, serializedData, function(error, result){
			if (!error) {
				topic.emit("dataChanged", serializedData);
			} else {
				//... handle error
			}
		}, 0);
	}
	
	function startTopic() {
		instance.storeData('plug');
	}
	
	startTopic();
}


exports.Topic = Topic;
