import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

export interface TODO {
  content: string
  priority: 'high' | 'medium' | 'low',
  id?: string,
  isEditing?: boolean
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.populateTodoList();
    this.initNotEditing();
  }

  title = 'front';
  TODOS: TODO[] = [];
  newTodoInput: string = ''; // Initialize it with an empty string
  choosenPriority: 'high' | 'medium' | 'low' = 'low';

  getPriorityCount(priority: string): number {
    let res = this.TODOS.filter((item, _) => (
      item.priority === priority
    )).length
    console.log(this.choosenPriority)
    return res;
  }

  async populateTodoList() {
    const res = await this.getTODOS();
    console.log(res);
    this.TODOS = res.data.entries as TODO[];
  }

  initNotEditing(){
    this.TODOS = this.TODOS.map((e)=>{
      return {
        id: e.id,
        content:e.content,
        priority:e.priority,
        isEditing:false
      } 
    })
  }

  setEditing(todo: TODO) {
    this.TODOS = this.TODOS.map((e: TODO) => {
      if (e.id === todo.id) {
        e.isEditing = !e.isEditing; // Toggle the isEditing property
      }
      return e;
    });
  }

  //data fetching functions

  async getTODOS() {
    const rawRes = await fetch(
      "http://127.0.0.1:3000/getTODO",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    const res = await rawRes.json()
    return res
  }

  async addTODO(content: string, priority: string) {
    try {
      console.log(this.choosenPriority);
      const rawRes = await fetch(
        "http://127.0.0.1:3000/addTODO",
        {
          method: "POST",
          body: JSON.stringify({
            content: content,
            priority: priority
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      const res = await rawRes.json();
      await this.populateTodoList();
    } catch (e) {
      console.log(e);
    }

  }

  async updateTODO(todo:TODO, content: string, priority: string, id?: string) {
    todo.isEditing = false;
    
    const rawRes = await fetch(
      "http://127.0.0.1:3000/updateTODO",
      {
        method: "PATCH",
        body: JSON.stringify({
          content: content,
          priority: priority,
          id: id
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    await this.populateTodoList();
    return
  }

  async deleteTODO(content: string, priority: string, id?: string) {
    const rawRes = await fetch(
      "http://127.0.0.1:3000/deleteTODO",
      {
        method: "DELETE",
        body: JSON.stringify({
          content: content,
          priority: priority,
          id: id
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    await this.populateTodoList();
    return
  }
}
