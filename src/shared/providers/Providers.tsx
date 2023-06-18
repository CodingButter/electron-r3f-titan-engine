import ToolsProvider from '@titan-shared/providers/ToolsProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ToolsProvider>
        {children}
        </ToolsProvider>
    );
}

export default Providers;