// 카드 추가
const onClickAdd = (e) => {
	const id = makeId();
	if (addInput.value === '') return;
	insertCard(createCardElement(addInput.value, id));
	insertCard(createDividerElement());
	addInput.value = '';
};

//
const makeId = () => {
	return new Date().getTime();
};

const createCardElement = (content, id) => {
	let card = document.createElement('div');
	card.setAttribute('class', 'card');
	card.setAttribute('id', id);

	let cardCheckbox = document.createElement('input');
	cardCheckbox.setAttribute('class', 'card-checkbox');
	cardCheckbox.setAttribute('type', 'checkbox');

	let cardInput = document.createElement('input');
	cardInput.setAttribute('class', 'card-input');
	cardInput.value = content;
	cardInput.disabled = true;

	let cardEdit = document.createElement('button');
	cardEdit.setAttribute('class', 'card-edit cardBtn');
	cardEdit.setAttribute('type', 'button');
	cardEdit.innerText = 'EDIT';

	let cardDelete = document.createElement('button');
	cardDelete.setAttribute('class', 'card-delete cardBtn');
	cardDelete.setAttribute('type', 'button');
	cardDelete.innerText = 'DELELTE';

	card.appendChild(cardCheckbox);
	card.appendChild(cardInput);
	card.appendChild(cardEdit);
	card.appendChild(cardDelete);
	bindCardEvent(card);

	return card;
};

const bindCardEvent = (cardElement) => {
	cardElement.setAttribute('draggable', true);
	cardElement.addEventListener('dragstart', card_dragstart_handler);
	cardElement.addEventListener('dragend', card_dragend_handler);

	const cardCheckbox = cardElement.querySelector('.card-checkbox');
	cardCheckbox.addEventListener('click', (e) => onClickCardCheckbox(e, cardCheckbox));

	const cardEdit = cardElement.querySelector('.card-edit');
	cardEdit.addEventListener('click', (e) => onClickCardEdit(e, cardEdit));

	const cardDelete = cardElement.querySelector('.card-delete');
	cardDelete.addEventListener('click', (e) => onClickCardDelete(e, cardDelete));
};

const insertCard = (card) => {
	cardList.appendChild(card);
};

const onClickCardCheckbox = (e, node) => {
	const card = node.parentNode;
	card.classList.toggle('complete');
};

const onClickCardEdit = (e, node) => {
	const card = node.parentNode;
	const cardInput = card.querySelector('.card-input');
	const cardEdit = card.querySelector('.card-edit');
	if (card.classList.contains('edit-mode')) {
		cardInput.disabled = true;
		cardEdit.innerText = 'EDIT';
	} else {
		cardInput.disabled = false;
		cardEdit.innerText = 'DONE';
	}
	card.classList.toggle('edit-mode');
};

const onClickCardDelete = (e, node) => {
	const card = node.parentNode;
	const cardList = card.parentNode;
	cardList.removeChild(card.nextSibling);
	cardList.removeChild(card);
};

const createDividerElement = () => {
	const divider = document.createElement('div');
	divider.setAttribute('class', 'card-divider');

	bindDividerEvent(divider);
	return divider;
};

const bindDividerEvent = (divider) => {
	divider.addEventListener('dragenter', divider_dragenter_handler);
};

const return_card_node = (e) => {
	const node = e.target;
	let card;
	if (node.classList.contains('card')) {
		card = node;
	} else {
		card = node.parentNode;
	}
	return card;
};

const card_dragstart_handler = (e) => {
	const card = return_card_node(e);
	card.classList.add('drag');
	drag_start_card = card;
};

const card_dragend_handler = (e) => {
	const card = return_card_node(e);
	const { cur } = card_divider_data;
	drag_start_card.classList.remove('drag');

	if (cur) {
		const pivot = cur.nextSibling;
		if (pivot !== card) {
			const divider = card.nextSibling;
			cardList.insertBefore(card, pivot);
			cardList.insertBefore(divider, pivot);
		}
		cur.classList.remove('active');
	}

	drag_start_card = null;
	card_divider_data = { cur: null, before: null };
};

const divider_dragenter_handler = (e) => {
	const { cur, before } = card_divider_data;
	e.target.classList.add('active');
	if (e.target === cur) {
	} else {
		if (cur) cur.classList.remove('active');

		card_divider_data = { before: cur, cur: e.target };
	}
};

bindDividerEvent(firstCardDivider);
