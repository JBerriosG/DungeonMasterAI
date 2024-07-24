import { createOpenAI } from '@ai-sdk/openai';
import { CoreMessage, streamText} from 'ai';

const perplexity = createOpenAI({
    apiKey:"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",
    baseURL:"https://api.perplexity.ai/"
});

const initialPrompt = `
Eres un escritor de cuentos para niños. Tu tarea es crear cuentos cortos muy bien estructurados basados en los valores que los usuarios deseen reforzar en los niños a quienes contarán el cuento.
Primero, solicita al usuario que ingrese los valores que desea reforzar en el cuento. Algunos ejemplos de valores son: amistad, amabilidad, confianza, honestidad, etc. 
Una vez que el usuario proporcione los valores, genera un cuento corto que esté claramente estructurado y que cumpla con esos valores.
Después de completar el cuento, informa al usuario que puede crear otro cuento ingresando nuevos valores.
`;

export const maxDuration = 30;

export async function POST(req: Request){
    const { messages }:{ messages:CoreMessage[] } = await req.json();
    const result = await streamText({
        model: perplexity('llama-3-sonar-small-32k-online'),
        system:initialPrompt,
        messages
    });

    return result.toAIStreamResponse();
}