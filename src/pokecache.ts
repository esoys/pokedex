export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};


export class Cache {
    #cache = new Map<string, CacheEntry<unknown>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined; 
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    };


    #reap(): void {
        const now = Date.now();
        console.log("REAP running at ", now, "interval", this.#interval);

        for (const [key, entry] of this.#cache.entries()) {
            console.log(" checking key", key, "createdAt", entry.createdAt);
            if (entry.createdAt < ( now - this.#interval)) {
                console.log("  DELETING", key);
                this.#cache.delete(key); 
            } else {
                console.log("   KEEPING", key);
            };
        };
    };


    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    };


    stopReapLoop(): void {
        if (this.#reapIntervalId !== undefined) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        };
    };


    add<T>(key: string, val: T): void {
        this.#cache.set(key, {
            val: val,
            createdAt: Date.now(),
        });

    };


    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (!entry) {
            return undefined;
        };
        return entry.val as T;
    };
};
