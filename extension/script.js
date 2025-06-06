try {
    var ai = {
        API_KEY: "",
        model: "qwen3:4b",
        hostname: "localhost",
        port: 11435,
        path: "/api/generate",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        context: "",
        formatRequest: (prompt) => {
            return JSON.stringify({ model: ai.model, prompt, stream: false });
        },
        formatResponse: (response) => {
            return JSON.parse(response).response;
        },
        prompt: async (question) => {
            var date = new Date();
            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().padStart(2, "0");
            var day = date.getDate().toString().padStart(2, "0");
            var hours = date.getHours().toString().padStart(2, "0");
            var minutes = date.getMinutes().toString().padStart(2, "0");
            var seconds = date.getSeconds().toString().padStart(2, "0");
            var datetime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
            var prompt = `${ai.context}system: ${datetime} | question: ${question} | answer: `;
            var body = ai.formatRequest(prompt);
            var url = `http://${ai.hostname}:${ai.port}${ai.path}`;
            var response = await fetch(url, {
                method: ai.method,
                headers: ai.headers,
                body,
            });
            var data = await response.json();
            if (data.response.includes("</think>")) {
                data.response = data.response.split("</think>").at(-1);
            }
            ai.context += `question: ${question} | answer: ${data.response} | `;
            return data.response;
        },
        clear: () => {
            ai.context = "";
            return "Cleared session context";
        },
    };
} catch (error) {
    console.error(error);
}