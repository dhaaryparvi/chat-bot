
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html"; // Redirect to login if not logged in
        return; // Stop execution if not logged in
    }

    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("userInput");

    // Function to add a message to the chatbox with new styling
    function addMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message-bubble"); // Base style for all bubbles

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (sender === "user") {
            messageElement.classList.add("user-message");
            messageElement.innerHTML = `<strong>You (${timestamp}):</strong> ${message}`;
        } else {
            messageElement.classList.add("bot-message");
            messageElement.innerHTML = `<strong>Bot (${timestamp}):</strong> ${message}`;
        }
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
    }

    // Function to send message, including API call to your backend
    window.sendMessage = async function() {
        const input = userInput.value.trim();

        if (input === "") return;

        // Display user's message
        addMessage("user", input);
        userInput.value = ""; // Clear input field

        try {
            // Send request to backend
            const response = await fetch("http://127.0.0.1:5000/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: input })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Display bot response
            if (data.results && data.results.length === 0) {
                addMessage("bot", "No products found.");
            } else if (data.results) {
                let reply = `Found Products:<ul>`;
                data.results.forEach(product => {
                    // Assuming product is an array like [name, description, category]
                    reply += `<li>${product[0]} - ${product[1]} (${product[2]})</li>`;
                });
                reply += `</ul>`;
                addMessage("bot", reply);
            } else {
                 // Handle cases where data.results might be missing or not an array
                addMessage("bot", "An unexpected response was received from the server.");
            }
        } catch (error) {
            console.error("Error sending message or getting response:", error);
            addMessage("bot", "Sorry, I'm having trouble connecting to the service. Please try again later.");
        }
    };

    // Listen for Enter key press in the input field
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Logout function
    window.logout = function() {
        localStorage.removeItem("loggedIn");
        window.location.href = "login.html";
    };

    // Reset Chat function
    window.resetChat = function() {
        chatbox.innerHTML = ''; // Clear all messages
        // Optionally add an initial bot message after reset
        addMessage("bot", "Chat has been reset. How can I help you starting fresh?");
        // Note: The original code removed chatHistory from localStorage.
        // If you were explicitly saving history in a way that needs clearing,
        // you might need to add localStorage.removeItem("chatHistory"); here.
        // Based on the provided code, `appendMessage` (which is removed) handled history.
        // If you still need history persistence, please let me know, and I can reintegrate it.
    };
});
