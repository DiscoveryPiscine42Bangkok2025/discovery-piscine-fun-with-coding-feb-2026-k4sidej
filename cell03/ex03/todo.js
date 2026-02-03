// Function to get todos from cookies
function getTodosFromCookie() {
    console.log('All cookies:', document.cookie);
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('todos='));
    
    if (cookieValue) {
        const todosString = decodeURIComponent(cookieValue.split('=')[1]);
        console.log('Loaded from cookie:', todosString);
        return JSON.parse(todosString);
    }
    console.log('No todos cookie found');
    return [];
}

// Function to save todos to cookies
function saveTodosToCookie(todos) {
    const todosString = JSON.stringify(todos);
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `todos=${encodeURIComponent(todosString)}; expires=${expires.toUTCString()}; path=/`;
    console.log('Saved to cookie:', todos);
    console.log('Cookie value:', document.cookie);
}

// Function to create a todo element
function createTodoElement(todoText) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = todoText;
    
    todoDiv.addEventListener('click', function() {
        if (confirm('Do you want to remove this TO DO?')) {
            removeTodo(todoDiv, todoText);
        }
    });
    
    return todoDiv;
}

// Function to add a todo
function addTodo(todoText) {
    const ftList = document.getElementById('ft_list');
    const todoDiv = createTodoElement(todoText);
    
    // Insert at the top of the list
    ftList.insertBefore(todoDiv, ftList.firstChild);
    
    // Save to cookies
    const todos = getTodosFromCookie();
    todos.unshift(todoText);
    saveTodosToCookie(todos);
}

// Function to remove a todo
function removeTodo(todoElement, todoText) {
    todoElement.remove();
    
    // Remove from cookies
    let todos = getTodosFromCookie();
    todos = todos.filter(todo => todo !== todoText);
    saveTodosToCookie(todos);
}

// Function to load todos from cookies
function loadTodos() {
    const todos = getTodosFromCookie();
    const ftList = document.getElementById('ft_list');
    
    todos.forEach(todoText => {
        const todoDiv = createTodoElement(todoText);
        ftList.appendChild(todoDiv);
    });
}

// Event listener for the New button
document.getElementById('new-btn').addEventListener('click', function() {
    const todoText = prompt('Enter a new TO DO:');
    
    if (todoText && todoText.trim() !== '') {
        addTodo(todoText.trim());
    }
});

// Load todos when the page loads
window.addEventListener('load', function() {
    loadTodos();
});
