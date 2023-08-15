import CoreEngine from "@app/titan/Core/Core"
let Core: CoreEngine;

type TitanEngine = {
  configure: (canvas: HTMLCanvasElement, width?: number, height?: number) => void;
  run: () => void;
  stop: () => void;
  setSize: (width: number, height: number) => void
  getCore: () => CoreEngine
}
const TitanEngine: TitanEngine = {
  configure: (canvas: HTMLCanvasElement, width?: number, height?: number) => {
    Core = new CoreEngine(canvas, width, height)
  },
  run: () => {
    Core.run();
  },
  stop: () => {
    Core.stop();
  },
  setSize: (width: number, height: number) => {
    Core.renderEngine.setSize(width, height)
  },
  getCore: () => Core
}

export default TitanEngine;
