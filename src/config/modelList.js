// Configuración del modelo
export const modelList = [
    {
        modelId: "meta.llama3-1-8b-instruct-v1:0",
        region: "us-west-2",
        body: JSON.stringify({
            prompt: "",
            max_gen_len: 100,
            temperature: 0.5,
            top_p: 0.9,
        }),
    }
]