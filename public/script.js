const runButton = document.getElementById("run-btn");

runButton.addEventListener("click", async () => {
  const editor = document.getElementById("editor");
  const code = editor.innerText;
  const output = document.getElementById("output");
  const language = document.getElementById("language").value;

  try {
    const response = await fetch(`/${language}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: code }),
    });

    const data = await response.json();
    if (response.ok) {
      output.innerText = data.output;
    } else {
      output.innerText = data.error;
    }
  } catch (error) {
    console.error(error);
    output.textContent = `Error running ${language} code`;
  }
});
