'use strict';

/**
 * Web Worker Helper Utility
 * Provides easy-to-use functions for offloading heavy computations to Web Workers
 */

/**
 * Create a web worker from a function
 * @param {Function} fn - Function to run in worker
 * @returns {Worker} Worker instance
 */
export const createWorkerFromFunction = (fn) => {
    const blob = new Blob(
        [`self.onmessage = ${fn.toString()}`],
        { type: 'application/javascript' }
    );
    const url = URL.createObjectURL(blob);
    return new Worker(url);
};

/**
 * Run a task in a web worker with timeout
 * @param {Function} task - Task function to execute
 * @param {*} data - Data to pass to the task
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise} Promise that resolves with result
 */
export const runInWorker = (task, data, timeout = 30000) => {
    return new Promise((resolve, reject) => {
        // Check if Web Workers are supported
        if (typeof Worker === 'undefined') {
            reject(new Error('Web Workers are not supported in this environment'));
            return;
        }

        const worker = createWorkerFromFunction(task);
        let timeoutId;

        // Handle messages from worker
        worker.onmessage = (e) => {
            clearTimeout(timeoutId);
            worker.terminate();
            resolve(e.data);
        };

        // Handle errors
        worker.onerror = (error) => {
            clearTimeout(timeoutId);
            worker.terminate();
            reject(error);
        };

        // Set timeout
        timeoutId = setTimeout(() => {
            worker.terminate();
            reject(new Error('Worker task timed out'));
        }, timeout);

        // Send data to worker
        worker.postMessage(data);
    });
};

/**
 * Pool of reusable workers for better performance
 */
export class WorkerPool {
    constructor(workerScript, poolSize = navigator.hardwareConcurrency || 4) {
        this.poolSize = poolSize;
        this.workers = [];
        this.availableWorkers = [];
        this.taskQueue = [];
        this.workerScript = workerScript;

        // Initialize worker pool
        for (let i = 0; i < poolSize; i++) {
            const worker = new Worker(workerScript);
            this.workers.push(worker);
            this.availableWorkers.push(worker);
        }
    }

    /**
     * Execute a task using an available worker
     * @param {*} data - Data to process
     * @returns {Promise} Promise that resolves with result
     */
    execute(data) {
        return new Promise((resolve, reject) => {
            const task = { data, resolve, reject };

            if (this.availableWorkers.length > 0) {
                this._runTask(task);
            } else {
                this.taskQueue.push(task);
            }
        });
    }

    /**
     * Run a task with an available worker
     * @private
     */
    _runTask(task) {
        const worker = this.availableWorkers.shift();

        const onMessage = (e) => {
            worker.removeEventListener('message', onMessage);
            worker.removeEventListener('error', onError);
            this.availableWorkers.push(worker);
            task.resolve(e.data);
            this._processQueue();
        };

        const onError = (error) => {
            worker.removeEventListener('message', onMessage);
            worker.removeEventListener('error', onError);
            this.availableWorkers.push(worker);
            task.reject(error);
            this._processQueue();
        };

        worker.addEventListener('message', onMessage);
        worker.addEventListener('error', onError);
        worker.postMessage(task.data);
    }

    /**
     * Process queued tasks
     * @private
     */
    _processQueue() {
        if (this.taskQueue.length > 0 && this.availableWorkers.length > 0) {
            const task = this.taskQueue.shift();
            this._runTask(task);
        }
    }

    /**
     * Terminate all workers
     */
    terminate() {
        this.workers.forEach(worker => worker.terminate());
        this.workers = [];
        this.availableWorkers = [];
        this.taskQueue = [];
    }
}

/**
 * Example heavy computation functions that can be offloaded to workers
 */

/**
 * Sort large array in worker
 * @param {Array} data - Array to sort
 * @returns {Promise<Array>} Sorted array
 */
export const sortInWorker = (data) => {
    const sortTask = (e) => {
        const sorted = e.data.sort((a, b) => a - b);
        self.postMessage(sorted);
    };
    return runInWorker(sortTask, data);
};

/**
 * Filter large dataset in worker
 * @param {Array} data - Data to filter
 * @param {Function} predicate - Filter predicate (as string)
 * @returns {Promise<Array>} Filtered array
 */
export const filterInWorker = (data, predicate) => {
    const filterTask = (e) => {
        const { data, predicateStr } = e.data;
        const pred = eval(`(${predicateStr})`);
        const filtered = data.filter(pred);
        self.postMessage(filtered);
    };
    return runInWorker(filterTask, { data, predicateStr: predicate.toString() });
};

/**
 * Process large dataset transformations
 * @param {Array} data - Data to transform
 * @param {Function} transformer - Transform function (as string)
 * @returns {Promise<Array>} Transformed array
 */
export const mapInWorker = (data, transformer) => {
    const mapTask = (e) => {
        const { data, transformerStr } = e.data;
        const transform = eval(`(${transformerStr})`);
        const mapped = data.map(transform);
        self.postMessage(mapped);
    };
    return runInWorker(mapTask, { data, transformerStr: transformer.toString() });
};

/**
 * Calculate hash for large data (useful for caching)
 * @param {*} data - Data to hash
 * @returns {Promise<string>} Hash string
 */
export const hashInWorker = (data) => {
    const hashTask = (e) => {
        const str = JSON.stringify(e.data);
        let hash = 0;
        let i = 0;
        const len = str.length;
        
        for (; i < len; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        
        self.postMessage(hash.toString(16));
    };
    return runInWorker(hashTask, data);
};

/**
 * Example worker script for the WorkerPool
 * Save this as a separate file if needed
 */
export const createWorkerScript = () => {
    const script = `
        self.onmessage = function(e) {
            try {
                const { type, data, fn } = e.data;
                
                switch(type) {
                    case 'transform':
                        const transformer = eval('(' + fn + ')');
                        const result = data.map(transformer);
                        self.postMessage({ success: true, result });
                        break;
                    
                    case 'compute':
                        const computer = eval('(' + fn + ')');
                        const computed = computer(data);
                        self.postMessage({ success: true, result: computed });
                        break;
                    
                    default:
                        self.postMessage({ success: false, error: 'Unknown task type' });
                }
            } catch (error) {
                self.postMessage({ success: false, error: error.message });
            }
        };
    `;
    
    const blob = new Blob([script], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
};

export default {
    createWorkerFromFunction,
    runInWorker,
    WorkerPool,
    sortInWorker,
    filterInWorker,
    mapInWorker,
    hashInWorker,
    createWorkerScript
};
