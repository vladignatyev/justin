var MAX_RECURSE_STEPS = 3;

var date = new Date();
var globalCachedTime = date.getTime(); 

function randRecurse (value, step) {
	if (step > MAX_RECURSE_STEPS)
		return value;
	else 
	return ~(~(randRecurse (value <<  1, step+1)) ^ 
			~(randRecurse (value <<  2, step+1)) ^
			~(randRecurse (value <<  3, step+1)) ^
			~(randRecurse (value <<  5, step+1)) ^
			~(randRecurse (value <<  8, step+1)) ^
			~(randRecurse (value << 13, step+1))); 
}

function randGen() {
	return randRecurse(++globalCachedTime,  0) & 0x00FFFFFF;
}

/**
 * Pseudo-unique numbers provider.
 * It's insecure yet. 
 * */
exports.get = randGen;
