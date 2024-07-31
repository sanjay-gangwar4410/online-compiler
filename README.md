
# Online Compiler

This project is an online compiler that supports running code in multiple programming languages, including Python, C++, and Node.js. It consists of a Node.js backend and a simple frontend to provide an easy-to-use interface for users to write and execute code.

## Features

- **Multiple Languages Supported:** Python, C++, and Node.js
- **Error Handling:** Compilation and runtime errors are captured and displayed
- **Temporary Files:** User code is saved to temporary files for execution
- **Secure Execution:** User code is isolated and executed in a controlled environment

## Project Structure

```
.
├── public
│   ├── index.html
│   ├── style.css
│   └── script.js
├── temp
├── serv.js
└── README.md
```

- `public/`: Contains the frontend files (HTML, CSS, JavaScript)
- `temp/`: Directory for temporary files created during code execution
- `serv.js`: The main backend server code
- `README.md`: Project documentation

## Getting Started

### Prerequisites

- Node.js and npm installed
- Python installed
- GCC, G++ (for compiling C++ code)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/sanjay-gangwar4410/online-compiler.git
cd online-compiler
```

2. **Install dependencies:**

```bash
npm install
```

### Running the Server

```bash
node serv.js
```

The server will start and listen on port 4000. Open your browser and navigate to `http://localhost:4000` to use the compiler.

## Usage

1. **Select Language:** Use the dropdown menu to select the language you want to write and execute code in (Python, C++, or Node.js).
2. **Write Code:** Enter your code in the editable `div` provided.
3. **Run Code:** Click the "Run" button to execute your code. The output or error messages will be displayed below the editor.

## Backend Implementation

The backend is built with Node.js and Express. It handles code execution for different languages as follows:

- **Python and Node.js:** The code is executed directly, and any output or errors are captured and returned to the client.
- **C++:** The code is first compiled using `g++`. If there are compilation errors, they are returned to the client. If the compilation is successful, the compiled executable is run, and any output or errors are captured and returned.


## Frontend Implementation

The frontend consists of a simple HTML page with a dropdown for language selection, an editable div for entering code, and a button to run the code.

## License

This project is licensed under the MIT License.
