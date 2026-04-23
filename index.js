let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem('tasks');
	if (savedTasks) {
		return JSON.parse(savedTasks);
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");
	
	textElement.textContent = item;
	
	deleteButton.addEventListener('click', function() {
		clone.remove();
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});
	
	duplicateButton.addEventListener('click', function() {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});
	
	editButton.addEventListener('click', function() {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});
	
	textElement.addEventListener('blur', function() {
		textElement.setAttribute('contenteditable', 'false');
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});
	
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
	const tasks = [];
	
	itemsNamesElements.forEach(function(item) {
		tasks.push(item.textContent);
	});
	
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

items = loadTasks();

items.forEach(function(item) {
	const taskElement = createItem(item);
	listElement.append(taskElement);
});

formElement.addEventListener('submit', function(evt) {

	evt.preventDefault();
	
	const taskText = inputElement.value.trim();
	
	if (taskText) {
		const taskElement = createItem(taskText);
		listElement.prepend(taskElement);
		inputElement.value = '';
		
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	}
});