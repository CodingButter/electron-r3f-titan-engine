import {
  createContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";

import TitanEngine from "@titan/interface"; 

export const TitanEngineContext = createContext<{ titan: TitanEngine | null }>({
  titan: null,
});

export interface TitanEngineProviderProps extends PropsWithChildren {
  canvasRef:{
    current:HTMLCanvasElement|null
  }
}

const TitanEngineProvider = ({ children, canvasRef }: TitanEngineProviderProps) => {
  const [titanEngine, setTitanEngine] = useState<TitanEngine|null>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      TitanEngine.init(canvasRef.current,window.innerWidth,window.innerHeight)
      setTitanEngine(()=>TitanEngine);
    }
    return () => {
      TitanEngine.destroy();
    }
  }, [canvasRef,titanEngine]);
  return (
    <TitanEngineContext.Provider value={{ titan:titanEngine }}>
      {children}
    </TitanEngineContext.Provider>
  );
};

export default TitanEngineProvider;
