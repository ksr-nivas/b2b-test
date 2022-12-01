export class WebWorker {
    private static _instance: Worker;
    url: string = '';
    constructor(url: string = '') {
        this.url = url;
    }

    public static getInstance(): Worker {
        if (!WebWorker._instance) {
            WebWorker._instance = new Worker(new URL('../modules/data-table/data-table.worker', import.meta.url));
        }
        return WebWorker._instance;
    }

    postMessage() {
        WebWorker._instance.onmessage
    }
}