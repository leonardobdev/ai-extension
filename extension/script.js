try {
    var ai = {
        API_KEY: "",
        model: "gemma3:4b",
        hostname: "127.0.0.1",
        port: 11435,
        path: "/api/generate",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        context: "",
        question: "",
        answer: "",
        system: `{datetime}`,
        template: `
        system: {system};
        context: {context};
        question: {question};
        answer: 
        `,
        messages: [],
        datetime: () => {
            var date = new Date();
            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().padStart(2, "0");
            var day = date.getDate().toString().padStart(2, "0");
            var hours = date.getHours().toString().padStart(2, "0");
            var minutes = date.getMinutes().toString().padStart(2, "0");
            var seconds = date.getSeconds().toString().padStart(2, "0");
            var datetime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
            return datetime;
        },
        formatRequest: (model, prompt) => {
            return JSON.stringify({ model, prompt, stream: false });
        },
        formatResponse: (response) => {
            return JSON.parse(response).response;
        },
        prompt: async (question) => {
            ai.question = question;
            var prompt = ai.template
                .replaceAll("{system}", ai.system)
                .replaceAll("{context}", ai.context)
                .replaceAll("{datetime}", ai.datetime())
                .replaceAll("{question}", ai.question)
                .replaceAll("{answer}", ai.answer);
            var body = ai.formatRequest(ai.model, prompt);
            var url = `http://${ai.hostname}:${ai.port}${ai.path}`;
            var response = await fetch(url, {
                method: ai.method,
                headers: ai.headers,
                body,
            });
            var answer = (await response.json()).response;
            if (answer.includes("</think>")) {
                answer = answer.split("</think>").at(-1);
            }
            ai.answer = answer;
            ai.messages.push({ question, answer });
            ai.context = ai.messages.map(({ question, answer }) =>
                `question: ${question} | answer: ${answer}`
            ).join(" | ");
            return answer;
        },
        clear: () => {
            ai.context = "";
            return "Cleared session context";
        },
    };
} catch (err) {
    console.error(err);
}