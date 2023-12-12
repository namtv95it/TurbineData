import axios from "axios";

export default function CKServerUploaderPlugin(editor: any) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
		// Configure the URL to the upload script in your back-end here!
		return new UploadAdapter(loader, editor.t);
	};
	editor.editing.view.document.on('delete', (evt: any, data: any) => {
		const selection = editor.model.document.selection;
		const firstPosition = selection.getFirstPosition();
		const nodeAfter = firstPosition.nodeAfter;
		if (nodeAfter && nodeAfter.name == "imageBlock") {
			let url = nodeAfter.getAttribute('src');
			axios.get(url + "&type=DELETE", {

			}).then(rep => {

			}).catch(err => {

			})
		}
	}, { priority: 'highest' });
}

/**
 * Upload adapter for Server.
 *
 * @private
 * @implements module:upload/filerepository~UploadAdapter
 */
class UploadAdapter {
	/**
	 * Creates a new adapter instance.
	 *
	 * @param {module:upload/filerepository~FileLoader} loader
	 * @param {module:utils/locale~Locale#t} t
	 */
	loader: any
	t: any
	reader: any
	constructor(loader: any, t: any) {
		/**
		 * FileLoader instance to use during the upload.
		 *
		 * @member {module:upload/filerepository~FileLoader} #loader
		 */
		this.loader = loader;

		/**
		 * Locale translation method.
		 *
		 * @member {module:utils/locale~Locale#t} #t
		 */
		this.t = t;
	}

	/**
	 * Starts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#upload
	 * @returns {Promise}
	 */
	upload() {
		return new Promise((resolve, reject) => {
			const reader = this.reader = new FileReader();
			let url = ""

			reader.onload = function () {
				resolve({ default: url });
			};

			reader.onerror = function (error) {
				reject(error);
			};

			reader.onabort = function () {
				reject();
			};

			this.loader.file.then((file: any) => {
				// modify by tiennd
				// reader.readAsDataURL(file);
				const data = new FormData();
				data.append('file', file);
				axios.post(process.env.REACT_APP_MAIN_URL + "/ckeditor/upload", data, {
				}).then(rep => {
					if (rep.data.status) {
						url = rep.data.message
						reader.readAsDataURL(file);
					}
				}).catch(err => {

				})
			});
		});
	}

	/**
	 * Aborts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#abort
	 * @returns {Promise}
	 */
	abort() {
		if (this.reader) {
			this.reader.abort();
		}
	}
}