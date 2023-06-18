import { useContext } from 'react';
import { ToolsContext } from '@titan-shared/providers/ToolsProvider';
const useTools = () => useContext(ToolsContext);
export default useTools;