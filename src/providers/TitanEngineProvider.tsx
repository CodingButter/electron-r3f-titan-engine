import {
  createContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import TitanEngine from "@app/titan/interface"; 

export const TitanEngineContext = createContext<{ titanEngine: TitanEngine | null }>({
  titanEngine: null,
});

export interface TitanEngineProviderProps extends PropsWithChildren {
  canvasRef:{
    current:HTMLCanvasElement|null
  }
}

const TitanEngineProvider = ({ children, canvasRef }: TitanEngineProviderProps) => {
  const [titanEngine, setTitanEngine] = useState<TitanEngine | null>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      TitanEngine.configure(canvasRef.current,window.innerWidth,window.innerHeight)
      TitanEngine.run();
      setTitanEngine(TitanEngine);
    }
    return () => {
      TitanEngine.stop();
    }
  }, [canvasRef,titanEngine]);
  return (
    <TitanEngineContext.Provider value={{ titanEngine }}>
      {children}
    </TitanEngineContext.Provider>
  );
};

export default TitanEngineProvider;
