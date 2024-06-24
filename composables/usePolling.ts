export default class Refetcher {
    static #instance: Refetcher;


    private constructor(refetchFunction: () => Promise<void>) {
        Refetcher.refetch(refetchFunction);
    }


    public static instance(refetchFunction: () => Promise<void>): Refetcher {
        if (!Refetcher.#instance) {
            Refetcher.#instance = new Refetcher(refetchFunction);
        }

        return Refetcher.#instance;
    }

    private static refetch(refetchFunction: () => Promise<void>) {
        return setTimeout(async () => {
            await refetchFunction();
            this.refetch(refetchFunction);
        }, 10000)
    }
}
