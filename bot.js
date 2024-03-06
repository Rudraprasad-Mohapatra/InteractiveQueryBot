// bot.js

document.addEventListener('DOMContentLoaded', function () {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.overflowY = "scroll";

    // Load JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log("JSON Data:", data); // Check JSON data

            // Find the initial bot message
            const initialMessage = data.find(item => item.initialMessage);
            displayBotMessage(initialMessage.responses[0], initialMessage.options);
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Function to display a bot message with options
    function displayBotMessage(message, options) {
        console.log("Bot Message:", message); // Check bot message
        console.log("Options:", options); // Check options
    
        const botChatLog = createChatLog("bot");
        const botResponse = createMessage(message, "bot"); // Pass "bot" as the type
        botChatLog.appendChild(botResponse);
        
        const responseOptions = createOptions(options);
        botChatLog.appendChild(responseOptions);
        setTimeout(() => {
            chatWindow.appendChild(botChatLog);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 1000);
    }
    

    // Function to display a user message
    function displayUserMessage(message) {
        const userChatLog = createChatLog("user");
        const userResponse = createMessage(message, "user"); // Pass "user" as the type
        userChatLog.appendChild(userResponse);
        chatWindow.appendChild(userChatLog);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    

    // Function to create a chat log container
    function createChatLog(type) {
        const chatLog = document.createElement('div');
        chatLog.classList.add(type + "-chat-log");
        chatLog.style.alignSelf = (type === "bot") ? "flex-start" : "flex-end";
        chatLog.style.display = "inline-block";
        return chatLog;

        Object.assign(chatLog.style, {
            width: "40%",

        })
    }

    // Function to create a message element
// Function to create a message element
function createMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(type + "-response");
    messageElement.textContent = message;
    return messageElement;
}


    // Function to create options buttons
    function createOptions(options) {
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add("response-options");
        Object.assign(optionsContainer.style ,{
            display: "flex",
            flexDirection: "column",
            gap:"5px"
        });
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            // Object.assign(button.style, {
            //     width: "200px"
            // })
            button.addEventListener('click', () => {
                handleOptionSelection(option);
                // Disable other options
                optionsContainer.querySelectorAll("button").forEach(btn => {
                    if (btn.textContent !== option) {
                        btn.disabled = true;
                        btn.style.backgroundColor = "#e1e1e1";
                    }
                });
            });
            optionsContainer.appendChild(button);
        });
        return optionsContainer;
    }

    // Function to handle option selection
    async function handleOptionSelection(option) {
        // Simulate user selection by displaying a user message
        displayUserMessage(option);

        // Simulate bot response based on user selection
        const botResponse = await getBotResponse(option);
        console.log("I am botResponse",botResponse);
        displayBotMessage(botResponse?.responses[0], botResponse?.options);
    }

    // Function to simulate bot response based on user selection
    async function getBotResponse(option) {
        console.log("I am option", option);
        let matchingObject = {};

        try {
            const response = await fetch('data.json');
            const data = await response.json();
            console.log("I am 0th data",data[0]);

            matchingObject = data.find(obj => obj.tag.toLowerCase() === option.toLowerCase());
            console.log("I am matching Object",matchingObject)
            return matchingObject;
        } catch (error) {
            console.error('Error fetching JSON:', error);

            return {};
        }
    }
});
