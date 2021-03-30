const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task, ind) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Elements UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group'
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);

  function renderAllTasks(taskList) {
    if (!taskList) {
      console.error('Empty object');
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2'
    );
    li.setAttribute('data-task-id', _id);

    const h2 = document.createElement('h2');
    h2.textContent = title;
    h2.style.fontWeight = 'bold';

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    const deletBtn = document.createElement('button');
    deletBtn.textContent = 'delete';
    deletBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    li.appendChild(h2);
    li.appendChild(article);
    li.appendChild(deletBtn);

    return li;
  }

  function onFormSubmitHandler(e) {
    //обработчик отправки формы
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value; // получаем значения из полей

    if (!titleValue || !bodyValue) {
      alert('Введите значение');
      return;
    } // проверяет форму

    const task = createNewTask(titleValue, bodyValue); // функция создающая объект, который добавляет в общий объект задач, возвроащает копию объекта
    const listItem = listItemTemplate(task); // функция формирует по шаблону из объекта ЛИшку
    listContainer.insertAdjacentElement('afterbegin', listItem); // добавляем в начало УЛ ЛИшку
    form.reset(); // очищаем форму
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      complited: false,
      _id: `task-${(Math.random() + '').split('.')[1]}`,
    };

    objOfTasks[newTask._id] = newTask;
    return { ...newTask }; // возвращаем поверхностую копию объекта для дальнейшей работы (в частности для работы в DOM)
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Delete task ${title}?`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  } 

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const btnParent = target.closest('[data-task-id]');
      const id = btnParent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, btnParent);
    }
  }
})(tasks);
