const onEnterAddInput = (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
		addBtn.click();
	}
};
