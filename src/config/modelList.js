// Configuración del modelo optimizada
export const modelList = [
    {
        name: "Llama 3.1 405B Instruct",
        modelId: "meta.llama3-1-405b-instruct-v1:0",
        region: "us-west-2",
        body:
        {
            prompt: "di hola",
            max_gen_len: 150, // Reducido para respuestas más directas
            temperature: 0.3, // Menor aleatoriedad para respuestas más coherentes
            top_p: 0.85, // Considerar un rango más amplio de opciones para variedad controlada
        }
    },
    {
        name: "Llama 3.1 70B Instruct",
        modelId: "meta.llama3-1-70b-instruct-v1:0",
        region: "us-west-2",
        body:
        {
            prompt: "hi",
            max_gen_len: 150, // Manteniendo una longitud mayor para respuestas detalladas
            temperature: 0.2, // Respuestas más precisas y menos aleatorias
            top_p: 0.9 // Buen equilibrio para mantener variedad y coherencia
        }
    },
    {
        name: "Amazon Titan Text G1 Express",
        modelId: "amazon.titan-text-express-v1",
        region: "us-east-1",
        body:
        {
            inputText: "this text",
            textGenerationConfig:
            {
                maxTokenCount: 150, // Reducido para evitar respuestas demasiado largas
                stopSequences: [], // Mantener vacío si no se desea detener el texto en ciertas palabras
                temperature: 0.3, // Mejor precisión en las respuestas
                topP: 0.8 // Control más estricto sobre la generación de palabras para coherencia
            }
        }
    },
    {   
        name:"Jamba Mini",
        modelId: "ai21.jamba-1-5-mini-v1:0",
        region: "us-east-1",
        body: {
            messages: [
                {
                    role: "user",
                    content: "INSERT YOUR PROMPT HERE"
                }
            ],
            max_tokens: 150,
            top_p: 0.8,
            temperature: 0.7
        }
    },
    {
        name:"Command R",
        modelId:"cohere.command-r-v1:0",
        region:"us-east-1",
        body: {
            chat_history:[],
            message : "hi!"
        }
    }
];
