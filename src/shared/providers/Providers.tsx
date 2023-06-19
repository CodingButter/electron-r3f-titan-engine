import ToolsProvider from '@titan-shared/providers/ToolsProvider';
import ModalProvider from '@titan-ui/providers/ModalProvider';
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ModalProvider>
            <ToolsProvider>
                {children}
            </ToolsProvider>
        </ModalProvider>
    );
}

export default Providers;