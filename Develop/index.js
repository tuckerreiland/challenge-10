const generateHtml = require ('./util/generateHtml')
const inquirer = require ('inquirer')
const fs = require ('fs')
const Manager = require ('./lib/Manager')
const Engineer = require ('./lib/Engineer')
const Intern = require ('./lib/Intern')

const team = []

const start = async () => {
    console.log("Welcome!")
    const input = await inquirer.prompt([
    {
        type: 'list',
        message: 'Which type of employee would you like to create?',
        name: 'employee',
        choices: ['Manager', 'Engineer', 'Intern']
    }])
    switch (input.employee){
        case 'Manager': getManager();
        break;
        case 'Engineer': getEngineer();
        break;
        case 'Intern': getIntern();
        break;
    }
}

const mainMenu = async () => {
    const input = await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ['Create another employee.', 'Genereate an HTML file.', 'Quit.']
        }])
        switch (input.choice){
            case 'Create another employee.': start();
            break;
            case 'Genereate an HTML file.': writeHtml();
            break;
            case 'Quit': return console.log("Come again soon!");
        }
}

const writeHtml = () => {
    const html = generateHtml(team)
    fs.writeFile('index.html', html, err => {
        if (err) {
          console.error(err);
        }})
    console.log("New index.html file created")
    mainMenu();
}

const getManager = async () => {
    console.log(`You chose to create a Manager.`)
    const inputManager = await inquirer.prompt([
        {
            type: 'input',
            message: "What is the manager's name?",
            name: 'name',
        },
        {
            type: 'input',
            message: "What is the manager's id?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the manager's email?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is the manager's office number?",
            name: 'officeNumber',
        }
    ])
    const newManager = new Manager(inputManager.name, inputManager.id, inputManager.email, inputManager.officeNumber)
    team.push(newManager)
    console.log(team)
    console.log(`New file created for ${newManager.name}.`)
    mainMenu()
}

const getEngineer = async () => {
    console.log(`You chose to create an Engineer.`)
    const inputEngineer = await inquirer.prompt([
        {
            type: 'input',
            message: "What is the engineer's name?",
            name: 'name',
        },
        {
            type: 'input',
            message: "What is the engineer's id?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the engineer's email?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is the engineer's github?",
            name: 'github',
        }
    ])
    const newEngineer = new Engineer (inputEngineer.name, inputEngineer.id, inputEngineer.email, inputEngineer.github)
    team.push(newEngineer)
    console.log(team)
    console.log(`New file created for ${newEngineer.name}.`)
    mainMenu()
}

const getIntern = async () => {
    console.log(`You chose to create an Intern.`)
    const inputIntern = await inquirer.prompt([
        {
            type: 'input',
            message: "What is the intern's name?",
            name: 'name',
        },
        {
            type: 'input',
            message: "What is the intern's id?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the intern's email?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is the intern's school?",
            name: 'school',
        }
    ])
    const newIntern = new Intern (inputIntern.name, inputIntern.id, inputIntern.email, inputIntern.school)
    team.push(newIntern)
    console.log(team)
    console.log(`New file created for ${inputIntern.name}.`)
    mainMenu()
}

start ();