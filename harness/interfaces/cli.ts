import 'dotenv/config';
import * as readline from 'node:readline/promises';
import { daiquiriAgent } from '../agent';
import { error } from 'node:console';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    console.log("Welcome to the Daiquiri Agent CLI. Type 'exit' to quit.");

    const messages: any[] = [];

    while (true) {
        try {
            const input = await rl.question('\n> ', { signal: AbortSignal.timeout(5000) });

            if (input == "" || input.trim().toLowerCase() === 'exit') {
                console.log('Goodbye!');
                rl.close();
                break;
            }

            if (!input.trim()) continue;

            messages.push({ role: 'user', content: input });

            try {
                process.stdout.write('Agent: ');

                const { textStream } = await daiquiriAgent.stream({
                    messages,
                });

                let fullResponse = '';
                for await (const textPart of textStream) {
                    process.stdout.write(textPart);
                    fullResponse += textPart;
                }
                console.log(); // Add a newline after the response

                messages.push({ role: 'assistant', content: fullResponse });

            } catch (error) {
                console.error('\nError:', error instanceof Error ? error.message : String(error));
            }
        } catch (err) {
            if (err instanceof Error) {
                if (err.name === 'AbortError') {
                    console.log('Goodbye!');
                    rl.close();
                    break;
                }
            }
        }
    }
}

main().catch(console.error);
