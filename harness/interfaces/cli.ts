import 'dotenv/config';
import * as readline from 'node:readline/promises';
import { daiquiriAgent } from '../agent';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    console.log("Welcome to the Daiquiri Agent CLI. Type 'exit' to quit.");

    const messages: any[] = [];

    while (true) {
        const input = await rl.question('\n> ');

        if (input.trim().toLowerCase() === 'exit') {
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
    }
}

main().catch(console.error);
