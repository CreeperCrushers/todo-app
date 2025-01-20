import inquirer from 'inquirer';
import {writeFileSync, readFile, truncate } from 'node:fs';

let tasks = []
const filePath = "todo.json"

readFile(filePath, (error, data) =>{
    if(error){
        console.error(error)
        return;
    }
        const alldata = JSON.parse(data)
        tasks = alldata
})
async function addTask(){
    await inquirer.prompt([
        {
            type: "input",
            message: "Enter your task.",
            name: "name"
        }
    ]).then((value) => {
        if(value.name === ''){
            return "type anything";
        }
        else{
            const task = {
                id: Date.now(),
                title: value.name,
                completed: false,
            }
            tasks.push(task)
            let newdata = JSON.stringify(tasks)
            writeFileSync(filePath,newdata)
        }
    })
    asker()
}
function asker(){
    inquirer.prompt([
        {
            type: "select",
            name: "name",
            message: "What do you want to do.",
            choices: [
                "Add Task",
                "Delete the Tasks",
                "See the Tasks",
                "Exit"
            ]
        }
    ]).then((value) => {
        if(value.name == "See the Tasks"){
            showTasks()
        }
        else if(value.name == "Delete the Tasks"){
            deleteTasks()
        }
        else if(value.name == "Add Task"){
            addTask()
        }
        else(
            console.log(`Exiting...`)
        )
    })
}
function showTasks(){
    for (let i = 0; i < tasks.length; i++) {
        console.log(`${i + 1}.Task Name: ${tasks[i].title} ,  Completion : ${tasks[i].completed}`)
    }
    asker()
}
async function deleteTasks(){
    await inquirer.prompt([
        {
        type: "input",
        message: "Write the task number you want to delete (Note it should only be an number!)",
        name: "name"
        }
    ]).then((value) => {
        if(value.name <= tasks.length){
            console.log(`Removed task no.${value.name}`)
            tasks.splice(value.name, 1)
            let latestData = JSON.stringify(tasks)
            writeFileSync(filePath,latestData)
        }
    })
    asker()
}