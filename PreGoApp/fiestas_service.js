function EncuentrosService(store) {
    var __store = store;
    if (typeof (__store.usuarios) === 'undefined') {
        __store.fiestas = [];
    }
	
	this.getAll = function(){
		return [];
	}
	 
	 
    this.rellenar = function () {
		 
	}
 
}

module.exports = EncuentrosService;