const express = require("express");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");
const app = express();

const tempDir = path.join(__dirname, "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const executeCode = (lang, extension, command, args, req, res) => {
  const userInput = req.body.user;

  const filename = `${Date.now()}.${extension}`;
  const filePath = path.join(tempDir, filename);

  fs.writeFile(filePath, userInput, (err) => {
    if (err) {
      console.error(`Error writing ${lang} file:`, err);
      return res.status(500).send(`Error creating ${lang} file`);
    }

    const process = spawn(command, [...args, filePath]);

    let output = "";
    let errorOutput = "";
    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    process.on("exit", (code) => {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Error deleting ${lang} file:`, err);
      });

      if (code === 0) {
        res.json({ output });
      } else {
        res.status(500).json({ error: errorOutput });
      }
    });
  });
};

app.post("/runPython", (req, res) => {
  executeCode("Python", "py", "python", [], req, res);
});

app.post("/runNode", (req, res) => {
  executeCode("Node.js", "js", "node", [], req, res);
});

app.post("/runCpp", (req, res) => {
  const userInput = req.body.user;

  const filename = `${Date.now()}.cpp`;
  const filePath = path.join(tempDir, filename);
  const execFilePath = path.join(tempDir, `${Date.now()}.out`);

  fs.writeFile(filePath, userInput, (err) => {
    if (err) {
      console.error("Error writing C++ file:", err);
      return res.status(500).send("Error creating C++ file");
    }

    const compile = spawn("g++", [filePath, "-o", execFilePath]);

    let compileOutput = "";
    let compileErrorOutput = "";
    compile.stdout.on("data", (data) => {
      compileOutput += data.toString();
    });

    compile.stderr.on("data", (data) => {
      compileErrorOutput += data.toString();
    });

    compile.on("exit", (code) => {
      if (code === 0) {
        const run = spawn(execFilePath);

        let runOutput = "";
        let runErrorOutput = "";
        run.stdout.on("data", (data) => {
          runOutput += data.toString();
        });

        run.stderr.on("data", (data) => {
          runErrorOutput += data.toString();
        });

        run.on("exit", (code) => {
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting C++ file:", err);
          });

          fs.unlink(execFilePath, (err) => {
            if (err) console.error("Error deleting executable file:", err);
          });

          if (code === 0) {
            res.json({ output: runOutput });
          } else {
            res.status(500).json({ error: runErrorOutput });
          }
        });
      } else {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting C++ file:", err);
        });
        res.status(500).json({ error: compileErrorOutput });
      }
    });
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(4000, () => console.log("Server listening on port 4000"));
