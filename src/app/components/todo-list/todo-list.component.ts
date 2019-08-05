import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {

  todos: Todo[];
  todoTitle: string;
  id: number;
  beforeEdit: string;
  newtitle: string

  constructor() { }

  ngOnInit() {
    this.beforeEdit = '';
    this.id = null;
    this.todoTitle = '';
    this.todos = [
      // {
      //   'id': 1,
      //   'title': 'Learn Angular',
      //   'completed': false,
      //   'editing': false,
      // },
      // {
      //   'id': 2,
      //   'title': 'Create To Do List',
      //   'completed': false,
      //   'editing': false,
      // },
      // {
      //   'id': 3,
      //   'title': 'Recreate To Do List',
      //   'completed': false,
      //   'editing': false,
      // }
    ];
    this.getTodos();
  }
  getTodos() {
    if(localStorage.getItem('todos') === null) {
      this.todos = [];
    }
    else {
      this.todos = JSON.parse(localStorage.getItem('todos'))
    }
  }

  addTodo() {
    if (this.todoTitle.trim().length === 0) {
      
      alert('Please fill out the form')

    } else {
      
      this.todos.push({
        id: this.id +1,
        title: this.todoTitle,
        completed: false,
        editing: false,
      })
      this.todoTitle = ''
      this.id++;

      localStorage.setItem(
        'todos',
        JSON.stringify(this.todos)
      );
    }
  }

  editTodo(todo: Todo) {
    this.beforeEdit = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo) {
    if(todo.title.trim().length === 0) {
    todo.title = this.beforeEdit;

    }
    todo.editing = false;
    localStorage.setItem(
      'todos',
      JSON.stringify(this.todos)
    );
  }

  cancelEdit(todo: Todo) {
    todo.title = this.beforeEdit;
    todo.editing = false;
  }

  deleteTodo() {
    console.log()
    this.todos = []
    // Add to LS
    localStorage.setItem(
      'todos',
      JSON.stringify(this.todos)
    );
  }

  remaining():number {
    return this.todos.filter(todo => !todo.completed).length;
  }
  done():number {
    return this.todos.filter(todo => todo.completed).length;
  }
  active() {
    return this.todos.filter(todo => !todo.completed);
  }
  transfered() {
    return this.todos.filter(todo => todo.completed);
  }

}

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  editing: boolean,
}
