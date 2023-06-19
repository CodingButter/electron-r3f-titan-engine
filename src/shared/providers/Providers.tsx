import ToolsProvider from '@titan-shared/providers/ToolsProvider';
import ModalProvider from '@titan-ui/providers/ModalProvider';
import GameManagerProvider from '@titan/src/engine/providers/GameManagerProvider';
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <GameManagerProvider>
        <ModalProvider>
            <ToolsProvider>
                {children}
            </ToolsProvider>
        </ModalProvider >
        </GameManagerProvider>
    );
}

export default Providers;