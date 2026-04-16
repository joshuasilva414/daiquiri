import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const provider = createOpenAICompatible({
    name: 'DAC-AI',
    apiKey: process.env.DAC_AI_KEY!,
    baseURL: process.env.INFERENCE_BASE_URL!,
});

export const dacAiModel = provider('Qwen/Qwen2.5-72B-Instruct-GPTQ-Int4')