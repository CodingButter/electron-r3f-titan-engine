export default class KeyboardInput {
    private static KEYS: { [key: string]: boolean } = {}
    static() {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            KeyboardInput.KEYS[e.key] = true;
        });
        document.addEventListener('keyup', (e: KeyboardEvent) => {
            KeyboardInput.KEYS[e.key] = false;
        });
    }
    static isPressed(key: KEYS) {
        return KeyboardInput.KEYS[key];
    }

}

