import fs from "fs";
import path from "path";
import gTTS from "gtts";

/**
 * Convierte texto a un archivo de audio y guarda el archivo.
 * @param {string} text - El texto a convertir a audio.
 * @returns {Promise<string>} - Una promesa que resuelve con la ruta del archivo de audio.
 */

export const convertTextToSpeech = (text) => {
    return new Promise((resolve, reject) => {
        const gtts = new gTTS(text, 'es');
        const fileName = 'output.mp3';
        const filePath = path.join(process.cwd(), fileName);

        gtts.save(filePath, (err) => {
            if (err) {
                reject(new Error('Error al convertir texto a audio'));
            } else {
                resolve(filePath);
            }
        });
    });
};

/**
 * Elimina un archivo de audio después de su uso.
 * @param {string} filePath - La ruta del archivo de audio a eliminar.
 */
export const deleteAudioFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error al eliminar el archivo de audio:', err);
        }
    });
};

export const convertSpeechToText = (speech) => {
    return new Promise((resolve, reject) => {
        const recognition = new SpeechRecognition() || new webkitSpeechRecognition();

        recognition.lang = 'es-MX'; // Configura el idioma del reconocimiento de voz
        recognition.interimResults = false; // No mostrar resultados intermedios
        recognition.maxAlternatives = 1; // Máximo de alternativas de reconocimiento

        // Evento que se ejecuta cuando se ha recibido el resultado del reconocimiento de voz
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            resolve(transcript);
        };

        // Evento que se ejecuta si ocurre un error durante el reconocimiento de voz
        recognition.onerror = (event) => {
            reject(new Error('Error en el reconocimiento de voz: ' + event.error));
        };

        // Iniciar el reconocimiento de voz
        recognition.start();
    });
};

convertSpeechToText()
    .then(transcript => {
        console.log('Transcripción:', transcript);
    })
    .catch(error => {
        console.error('Error:', error);
    });



