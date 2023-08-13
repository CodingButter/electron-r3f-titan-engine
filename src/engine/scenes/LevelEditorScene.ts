import { vec2 } from "gl-matrix";
import Scene from "./Scene";
import Camera from "@titan-engine/Camera";
import Renderer from "@titan-engine/renderer/Renderer";
import AssetPool from "@titan-engine/util/AssetPool";
import Spritesheet from "@titan-engine/components/Spritesheet";




export default class LevelEditorScene extends Scene {
  private spriteIndex = 0;
  private sprites: Spritesheet | null = null;
  private assetsLoaded = false;

  public init(): void {
    this.camera = new Camera(vec2.fromValues(0, 0))

    this.renderer = new Renderer()
    this.loadResources(() => {
      this.sprites = AssetPool.getSpritesheet("/assets/images/tileset.png") as Spritesheet
      this.assetsLoaded = true;
      this.save();
    })

  }

  private loadResources(loaded: () => void): void {
    AssetPool.getShader("http://localhost:8080/default.glsl")
    const spritesheet = new Spritesheet(AssetPool.getTexture("/assets/images/tileset.png"), 8 * 8, 64, 64)
    AssetPool.addSpritesheet("/assets/images/tileset.png", spritesheet)
    spritesheet.on("load", loaded)
  }

  public update(dt: number): void {
    if (!this.assetsLoaded) return;
    this.camera.adjustProjection();
    for (const gameObject of this.gameObjects) {
      gameObject?.update(dt);
    }
    this.renderer.render()
  }
}