document.addEventListener("DOMContentLoaded", function() {
    const chatHistory = document.getElementById("chat-history");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const faqOptionsContainer = document.getElementById("faq-options");

    sendBtn.addEventListener("click", function() {
        sendMessage(userInput.value);
    });

    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage(userInput.value);
        }
    });

    // Event listener para manejar la selección de opciones de preguntas frecuentes
    faqOptionsContainer.addEventListener("click", function(event) {
        if (event.target.tagName === "SUMMARY") {
            const faqContent = event.target.nextElementSibling;
            faqContent.classList.toggle("open");

            // Cerrar otros detalles abiertos
            const details = faqOptionsContainer.querySelectorAll("details");
            details.forEach(detail => {
                if (detail !== event.target.parentNode) {
                    detail.querySelector(".faq-content").classList.remove("open");
                }
            });
        } else if (event.target.classList.contains("faq-content")) {
            const selectedFAQ = event.target.innerText.trim();
            userInput.value = selectedFAQ;
        }
    });

    function sendMessage(message) {
        if (message.trim() === "") return;

        // Agregar mensaje del usuario al historial
        appendMessage("👤 " + message, true);

        // Simular respuesta del bot (aquí se puede simular una carga o respuesta asíncrona)
        showBotTyping(true); // Mostrar animación de escribiendo

        setTimeout(function() {
            const botResponse = generateBotResponse(message);
            appendMessage("🤖 " + botResponse, false);
            showBotTyping(false); // Ocultar animación de escribiendo después de la respuesta

            // Mostrar gif de despedida si el usuario dice "adiós"
            if (message.toLowerCase().includes("adiós")) {
                showGoodbyeGif();
            }
        }, 1500); // Simulación de tiempo de respuesta del bot

        // Limpiar campo de entrada
        userInput.value = "";
    }

    function appendMessage(message, isUser) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(isUser ? "user-message" : "bot-message");
        messageElement.innerHTML = message;
        messageElement.style.opacity = "0"; // Inicialmente oculto
        chatHistory.appendChild(messageElement);

        // Hacer scroll al último mensaje
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // Animación de entrada
        setTimeout(function() {
            messageElement.style.opacity = "1";
            messageElement.style.transform = "translateY(0)";
        }, 100);
    }

    function generateBotResponse(message) {
        switch (message.toLowerCase()) {
            case '¿cuál es tu nombre?':
                return 'Mi nombre es Chatbot del Colegio San Rafael I.E.D.';
            case '¿qué haces?':
                return 'Estoy aquí para ayudarte con cualquier pregunta que tengas sobre el Colegio San Rafael I.E.D.';
            case '¿cómo estás?':
                return 'Estoy funcionando perfectamente, gracias por preguntar.';
            case '¿cuándo son las vacaciones?':
                return 'Las vacaciones son en Diciembre y Junio, según el calendario escolar.';
            case '¿dónde puedo encontrar los materiales de estudio?':
                return 'Puedes encontrar los materiales de estudio en la plataforma virtual del colegio.';
            case 'gracias':
                return '¡Gracias a ti! Con gusto. Para mantenerse informado y obtener más detalles, te invito a visitar nuestra página web oficial del Colegio San Rafael.';
            default:
                return '¡Hola! Soy el chatbot del Colegio San Rafael I.E.D. ¿En qué puedo ayudarte?';
        }
    }

    function showBotTyping(show) {
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "bot-message", "typing");

        if (show) {
            typingIndicator.innerHTML = `
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="20" r="1.5" fill="#333">
                        <animate attributeName="cx" values="10;20;10" dur="1s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="15" cy="20" r="1.5" fill="#333">
                        <animate attributeName="cx" values="15;25;15" dur="1s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="20" cy="20" r="1.5" fill="#333">
                        <animate attributeName="cx" values="20;30;20" dur="1s" repeatCount="indefinite" />
                    </circle>
                </svg>
                <span style="margin-left: 10px;">Escribiendo...</span>
            `;
            chatHistory.appendChild(typingIndicator);
            chatHistory.scrollTop = chatHistory.scrollHeight; // Hacer scroll al nuevo mensaje
        } else {
            const typingIndicator = chatHistory.querySelector(".typing");
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }
    }
});
