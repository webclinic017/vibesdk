import { StackConfiguration, CodeIssue } from './types';

// Hardcoded configurations for the supported stacks.
// In the future, this could be loaded from a dynamic source.
const stackConfigurations: Record<StackConfiguration['id'], StackConfiguration> = {
    'react-vite': {
        id: 'react-vite',
        language: 'typescript',
        framework: 'react',
        displayName: 'React + Vite',
        description: 'A modern frontend stack using React and Vite for blazing fast development.',
        templateName: 'react-base', // This should match the template name in R2
        tools: {
            linter: {
                command: 'bun run lint',
                parser: (output: string): CodeIssue[] => {
                    // Placeholder for a real eslint JSON output parser
                    console.log('Parsing ESLint output:', output);
                    return [];
                }
            },
            typeChecker: {
                command: 'bunx tsc -b --incremental --noEmit --pretty false',
                parser: (output: string): CodeIssue[] => {
                    // Placeholder for a real tsc output parser
                    console.log('Parsing TSC output:', output);
                    return [];
                }
            },
            runner: {
                command: 'bun run dev'
            }
        },
        prompts: {
            blueprint: 'react_blueprint_prompt_key',
            phaseImplementation: 'react_phase_implementation_prompt_key',
            codeFixer: 'react_code_fixer_prompt_key'
        }
    },
    'fastapi-sqlmodel': {
        id: 'fastapi-sqlmodel',
        language: 'python',
        framework: 'fastapi',
        displayName: 'FastAPI + SQLModel',
        description: 'A high-performance Python backend stack using FastAPI and SQLModel for robust data handling.',
        templateName: 'fastapi-base',
        tools: {
            linter: {
                command: 'ruff check . --output-format=json',
                parser: (output: string): CodeIssue[] => {
                    // Placeholder for a real ruff JSON output parser
                    console.log('Parsing ruff output:', output);
                    return [];
                }
            },
            typeChecker: {
                command: 'mypy . --json-report',
                parser: (output: string): CodeIssue[] => {
                    // Placeholder for a real mypy JSON output parser
                    console.log('Parsing mypy output:', output);
                    return [];
                }
            },
            runner: {
                command: 'uvicorn main:app --host 0.0.0.0 --port 3000 --reload'
            }
        },
        prompts: {
            blueprint: 'python_blueprint_prompt_key',
            phaseImplementation: 'python_phase_implementation_prompt_key',
            codeFixer: 'python_code_fixer_prompt_key'
        }
    }
};

/**
 * A centralized service for managing technology stack configurations.
 * This service is the single source of truth for stack-specific information,
 * such as tool commands, prompt keys, and template details.
 */
export class StackConfigService {
    /**
     * Retrieves the configuration for a specific technology stack.
     * @param id The unique identifier of the stack.
     * @returns The configuration object for the requested stack, or undefined if not found.
     */
    public getStack(id: StackConfiguration['id']): StackConfiguration | undefined {
        return stackConfigurations[id];
    }

    /**
     * Lists all available technology stacks.
     * @returns An array of all stack configuration objects.
     */
    public listStacks(): StackConfiguration[] {
        return Object.values(stackConfigurations);
    }
}