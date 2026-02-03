$(document).ready(function() {
    function getTodosFromCookie() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('todos='));
        
        if (cookieValue) {
            const todosString = decodeURIComponent(cookieValue.split('=')[1]);
            return JSON.parse(todosString);
        }
        return [];
    }

    function saveTodosToCookie(todos) {
        const todosString = JSON.stringify(todos);
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        document.cookie = `todos=${encodeURIComponent(todosString)}; expires=${expires.toUTCString()}; path=/`;
    }

    function createTodoElement(todoText) {
        const $todoDiv = $('<div>')
            .addClass('todo-item')
            .text(todoText)
            .click(function() {
                if (confirm('Do you want to remove this TO DO?')) {
                    removeTodo($(this), todoText);
                }
            });
        
        return $todoDiv;
    }

    function addTodo(todoText) {
        const $todoDiv = createTodoElement(todoText);
        $('#ft_list').prepend($todoDiv);
        
        const todos = getTodosFromCookie();
        todos.unshift(todoText);
        saveTodosToCookie(todos);
    }

    function removeTodo($todoElement, todoText) {
        $todoElement.remove();
        
        let todos = getTodosFromCookie();
        todos = todos.filter(todo => todo !== todoText);
        saveTodosToCookie(todos);
    }

    function loadTodos() {
        const todos = getTodosFromCookie();
        
        todos.forEach(function(todoText) {
            const $todoDiv = createTodoElement(todoText);
            $('#ft_list').append($todoDiv);
        });
    }

    $('#new-btn').click(function() {
        const todoText = prompt('Enter a new TO DO:');
        
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText.trim());
        }
    });

    loadTodos();
});
