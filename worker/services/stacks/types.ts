export interface CodeIssue {
    message: string;
    filePath: string;
    line?: number;
    column?: number;
    ruleId?: string;
    source?: string;
    severity: 'error' | 'warning' | 'info';
}

export interface StackConfiguration {
  id: 'react-vite' | 'fastapi-sqlmodel'; // Unique identifier
  language: 'typescript' | 'python';
  framework: 'react' | 'fastapi';
  displayName: string;
  description: string;
  templateName: string; // The corresponding template in R2
  tools: {
    linter: { command: string; parser: (output: string) => CodeIssue[] };
    typeChecker: { command: string; parser: (output: string) => CodeIssue[] };
    runner: { command: string };
  };
  prompts: { // Paths or keys to language-specific prompts
    blueprint: string;
    phaseImplementation: string;
    codeFixer: string;
  };
}