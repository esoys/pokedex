export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    ;
    #reap() {
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < (now - this.#interval)) {
                this.#cache.delete(key);
            }
            ;
        }
        ;
    }
    ;
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
    ;
    stopReapLoop() {
        if (this.#reapIntervalId !== undefined) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
        ;
    }
    ;
    add(key, val) {
        this.#cache.set(key, {
            val: val,
            createdAt: Date.now(),
        });
    }
    ;
    get(key) {
        const entry = this.#cache.get(key);
        if (!entry) {
            return undefined;
        }
        ;
        return entry.val;
    }
    ;
}
;
