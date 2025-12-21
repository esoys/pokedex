export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>, args: string[]) => Promise<void>;
};


