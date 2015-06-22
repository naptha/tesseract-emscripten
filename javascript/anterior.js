BoolPtr.prototype['getValue'] = function(){ return !!getValue(getPointer(this), 'i1') }
IntPtr.prototype['getValue'] = function(){ return getValue(getPointer(this), 'i32') }
FloatPtr.prototype['getValue'] = function(){ return getValue(getPointer(this), 'f32') }
DoublePtr.prototype['getValue'] = function(){ return getValue(getPointer(this), 'f64') }

BoxPtr.prototype['get'] = PixaPtr.prototype['get'] = PixPtr.prototype['get'] = 
	function(n){ return getValue(getPointer(this) + (n || 0) * 4, '*') }


function pointerHelper(){
	this.obj = {}
}
pointerHelper.prototype['bool'] = function(name){
	return this.obj[name] = wrapPointer(_malloc(4), BoolPtr)
}
pointerHelper.prototype['i32'] = function(name){
	return this.obj[name] = wrapPointer(_malloc(4), IntPtr)
}
pointerHelper.prototype['f32'] = function(name){
	return this.obj[name] = wrapPointer(_malloc(4), FloatPtr)
}
pointerHelper.prototype['f64'] = function(name){
	return this.obj[name] = wrapPointer(_malloc(8), DoublePtr)
}
pointerHelper.prototype['peek'] = function(){
	var obj = {};
	for(var name in this.obj){
		obj[name] = this.obj[name]['getValue']()
	}
	return obj;
}

pointerHelper.prototype['get'] = function(){
	var obj = {};
	for(var name in this.obj){
		obj[name] = this.obj[name]['getValue']()
		_free(getPointer(this.obj[name]))
	}
	return obj;
}

Module['pointerHelper'] = pointerHelper;