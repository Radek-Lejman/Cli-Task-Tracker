# Task Tracker CLI

Task Tracker CLI is a command-line application designed to help you manage your to-do list directly from your terminal. Built with TypeScript, Node.js, and the native `fs` module, this project follows SOLID principles and DRY practices for maintainable and scalable code.

## Table of Contents
- [Task Tracker CLI](#task-tracker-cli)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Requirements](#requirements)
  - [Installation](#installation)
    - [macOS / Linux](#macos--linux)
    - [Windows (CMD / PowerShell)](#windows-cmd--powershell)
    - [Note](#note)
  - [Examples](#examples)
    - [Add a new task](#add-a-new-task)
    - [Update a task](#update-a-task)
    - [Delete a task](#delete-a-task)
    - [Mark a task as in-progress](#mark-a-task-as-in-progress)
    - [Mark a task as done](#mark-a-task-as-done)
    - [List all tasks](#list-all-tasks)
    - [Filter tasks by status](#filter-tasks-by-status)
  - [Available CLI Commands](#available-cli-commands)
    - [Command	Description](#commanddescription)
  - [Project Structure](#project-structure)
  - [Development](#development)
  - [Contributing](#contributing)
  - [License](#license)

## Features
- Create, update, and delete tasks  
- Mark tasks as in-progress or done  
- List all tasks or filter by status: `todo`, `in-progress`, `done`  
- Persistent storage of tasks in a JSON file in the working directory  
- Argument validation and error handling for robust CLI experience  

## Technologies
- **Runtime:** Node.js  
- **Language:** TypeScript  
- **File I/O:** `fs/promises` (no external libraries)  
- **Architecture:** Modular design  

## Requirements
- Node.js >= 14.x  
- npm >= 6.x or yarn  

## Installation

Follow the steps below for your operating system:

### macOS / Linux

1. **Clone, install, build and link**  
   ```
   git clone https://github.com/your-username/task-tracker-cli.git
   cd task-tracker-cli
   npm install
   npm run build
   chmod +x bin/cli.js
   npm link
   ```
2.	**(Optional) Ensure global NPM bin is in your PATH**

    If task-cli is not yet recognized, add this line to your ~/.zshrc or ~/.bashrc:
    ```
    export PATH="$HOME/.npm-global/bin:$PATH"
    source ~/.zshrc
    ```
3.	Test the CLI
    ```
    task-cli add "Buy groceries"
    task-cli list
    ```

### Windows (CMD / PowerShell)
1. **Clone, install, build and link**
    ```
    git clone https://github.com/your-username/task-tracker-cli.git
    cd task-tracker-cli
    npm install
    npm run build
    npm link
    task-cli add "Buy groceries"
    task-cli list
    ```
### Note
	-	To unlink your global install, run npm unlink in the project directory.
	-	If you’re using WSL, Cygwin or MinGW on Windows, treat those environments as macOS/Linux—i.e., run chmod +x bin/cli.js before npm link.


## Examples

### Add a new task
```
task-cli add "Buy groceries"
```

### Update a task
```
task-cli update 1 "Buy groceries and cook dinner"
```

### Delete a task
```
task-cli delete 1
```

### Mark a task as in-progress
```
task-cli mark-in-progress 2
```

### Mark a task as done
```
task-cli mark-done 2
```

### List all tasks
```
task-cli list
```

### Filter tasks by status
```
task-cli list todo
task-cli list in-progress
task-cli list done
```

## Available CLI Commands

### Command	Description
1. **add** -	Add one or more tasks

2. **update id** - Update the description of a task with given id

3. **delete id** - Delete a task by id

4. **mark-in-progress id** - Set a task’s status to in-progress

5. **mark-done id** - Set a task’s status to done

6. **list [status]** -	List all tasks or filter by todo, in-progress, done

## Project Structure

```text
task-tracker-cli/
├── bin/
│   └── cli.js             # wrapper with shebang → requires ./dist/bin/cli.js
├── src/
│   ├── commands/          # CLI command definitions
│   ├── services/          # Business logic (TaskManager, etc.)
│   ├── store/             # File-based storage abstraction
│   ├── utils/             # Helper functions (validators, printHelp)
│   ├── types/             # TypeScript types and enums
│   └── bin/cli.ts         # CLI entry point (compiled to dist/bin/cli.js)
├── dist/                  # Compiled JS output
├── src/taskStore.json     # JSON file for persistent storage
├── package.json           # npm configuration
└── tsconfig.json          # TypeScript configuration
```

## Development

Follow these steps to set up and run the project in a development environment.

1.  **Build the Project**

    This command compiles the TypeScript source code into JavaScript in the `dist/` directory.

    ```bash
    npm run build
    ```

2.  **Run in Development Mode**

    This command starts the application using `ts-node-dev`, which will automatically watch for file changes and restart the server.

    ```bash
    npm run dev
    ```

3.  **Implement and Test**

    With the project running, you can now implement new features or fix bugs. Remember to test your changes locally.

## Contributing

Contributions are always welcome! Please feel free to open an issue for discussion or submit a pull request with your changes.

Before submitting a pull request, please ensure you have done the following:

* The project builds successfully without errors using `npm run build`.
* All new changes have been tested locally to ensure they work as expected.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for the full text.