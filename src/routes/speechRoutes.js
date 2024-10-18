import express from "express";
import { convertTextToSpeech, deleteAudioFile } from "../services/owner/speech.js";

export const speechRouter = express.Router();

speechRouter.use((req, res, next) => {
    console.log(req.ip);
    next();
});

speechRouter.post("/textToSpeech", async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "No se proporcionó ningún texto" });
    }

    try {
        const filePath = await convertTextToSpeech(text);

        // Enviar el archivo de audio al frontend
        res.sendFile(filePath, () => {
            // Eliminar el archivo de audio después de enviarlo
            deleteAudioFile(filePath);
        });
    } catch (error) {
        console.error('Error en el proceso de conversión de texto a audio:', error);
        res.status(500).json({ error: 'Error en el proceso de conversión de texto a audio' });
    }
});

speechRouter.post("/speechToText", async (req, res) =>{
    const { audio } = req.body;
    if (!audio) {
        return res.status(400).json({ error: "No se proporcionó ningún audio" });
    }

    try{

        const text = await convertSpeechToText(audio);
        res.json({ text });

    }catch(error){
        console.error('Error en el proceso de conversión de audio a texto:', error);
        res.status(500).json({ error: 'Error en el proceso de conversión de audio a texto' });
    }

});

