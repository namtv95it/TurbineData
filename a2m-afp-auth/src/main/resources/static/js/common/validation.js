function validationForm(id) {
	let form = document.getElementById(id);
	for (let i = 0; form.elements.length; i++) {
		if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
			alert('There are some required fields!');
			return false;
		}
	}

}	