// Configuración del modelo
export const modelList = [
    {
        name: "Llama 3.1 405B Instruct",
        modelId: "meta.llama3-1-405b-instruct-v1:0",
        region: "us-west-2",
        body:
        {
            prompt: "hola",
            max_gen_len: 512,
            temperature: 0.5,
            top_p: 0.9,
        }
    },
    {
        name: "Llama 3.1 70B Instruct",
        modelId: "meta.llama3-1-70b-instruct-v1:0",
        region: "us-west-2",
        body:
        {
            prompt: "",
            max_gen_len: 512,
            temperature: 0.5,
            top_p: 0.9
        }
    },
    {
        name: "Amazon Titan Text G1 Express",
        modelId: "amazon.titan-text-express-v1",
        region: "us-east-1",
        body: 
        {
            inputText:"this is where you place your input text",
            textGenerationConfig:
            {
                maxTokenCount:8192,
                stopSequences:[],
                temperature:0,
                topP:1
            }
        }
    }
]