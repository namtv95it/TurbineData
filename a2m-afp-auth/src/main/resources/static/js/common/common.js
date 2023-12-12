


var sys = {
	mariaDB: {
		ajax: function(url, param, type = "get", async = false) {
			var result;

			$.ajaxSettings.traditional = true;
			$.ajax({
				url: url,
				type: type,
				async: async,	//동기화
				data: param,
				dataType: 'json',
				contentType: 'application/json',
				error: function(req, status, err) {
				},
				success: function(data) {
					result = data;
				}
			});
			return result;
		},
	},

	convertParam: function(param) {
		for (let [key, value] of Object.entries(param)) {
			param[key] = ['object', 'array'].includes(sys.getType(value)) ? JSON.stringify(value) : value;
		}
		return param;
	},

	getData: function(path, param) {
		return sys.mariaDB.ajax(path, param);
	},

	getType: function(t) {
		return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
	},

}

class ShowToast {
	
	static success(message){
		Toastify({
			text: message,
			className: "info",
			style: {
				background: "#45cb85",
			}
		}).showToast();
	}
	
	static error (message){
		Toastify({
			text: message,
			className: "info",
			style: {
				background: "#bd362f",
			}
		}).showToast();
	}
	
	static info(message){
		Toastify({
			text: message,
			className: "info",
			style: {
				background: "#45cb85",
			}
		}).showToast();
	}
}

class Spinner {
	
	static show(message='Please wait...'){
		$('#ROOT_ID').waitMe({
			effect: 'bounce',
			text: message,
			bg: 'rgba(0, 0, 0, 0.6)',
			color: '#fff'
		});
	}
	
	static hide(){
		$('#ROOT_ID').waitMe("hide");
	}
	
}
