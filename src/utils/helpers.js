'use strict';

// Common utility functions

/**
 * Combines multiple CSS class names
 * @param {...string} classes - CSS class names
 * @returns {string} Combined class names
 */
export const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Check if an element is in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} True if element is in viewport
 */
export const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 * @param {number} offset - Offset from top (default: 0)
 */
export const scrollToElement = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

/**
 * Scrolls to the top of the page
 * @param {boolean} smooth - Whether to use smooth scrolling (default: false for instant)
 */
export const scrollToTop = (smooth = false) => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? 'smooth' : 'instant'
    });
};

/**
 * Custom hook for scroll restoration on route change
 * Can be used in individual components for more control
 */
export const useScrollRestoration = () => {
    return {
        scrollToTop,
        restoreScroll: () => scrollToTop(false),
        smoothScrollToTop: () => scrollToTop(true)
    };
};

/**
 * Memoization function for expensive computations
 * @param {Function} fn - Function to memoize
 * @returns {Function} Memoized function
 */
export const memoize = (fn) => {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        // Limit cache size to prevent memory leaks
        if (cache.size > 100) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }
        return result;
    };
};

/**
 * Schedule non-critical tasks with requestIdleCallback
 * Falls back to setTimeout if not available
 * @param {Function} callback - Function to execute when idle
 * @param {Object} options - Options with timeout property
 */
export const scheduleIdleTask = (callback, options = { timeout: 2000 }) => {
    if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(callback, options);
    }
    return setTimeout(callback, 1);
};

/**
 * Cancel idle task
 * @param {number} id - ID returned from scheduleIdleTask
 */
export const cancelIdleTask = (id) => {
    if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(id);
    } else {
        clearTimeout(id);
    }
};

/**
 * Create a reusable IntersectionObserver for lazy loading
 * @param {Function} callback - Callback when element intersects
 * @param {Object} options - IntersectionObserver options
 * @returns {IntersectionObserver} Observer instance
 */
export const createLazyObserver = (callback, options = {}) => {
    const defaultOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target, observer);
            }
        });
    }, { ...defaultOptions, ...options });
};

/**
 * Batch DOM updates using DocumentFragment
 * @param {Function} updateFn - Function that receives fragment to update
 * @param {HTMLElement} container - Container to append fragment to
 */
export const batchDOMUpdates = (updateFn, container) => {
    const fragment = document.createDocumentFragment();
    updateFn(fragment);
    container.appendChild(fragment);
};

/**
 * Performance profiler for measuring execution time
 * @param {string} label - Label for the measurement
 * @returns {Object} start and end functions
 */
export const profiler = (label) => {
    return {
        start: () => performance.mark(`${label}-start`),
        end: () => {
            performance.mark(`${label}-end`);
            performance.measure(label, `${label}-start`, `${label}-end`);
            const measure = performance.getEntriesByName(label)[0];
            console.log(`${label}: ${measure.duration.toFixed(2)}ms`);
            performance.clearMarks();
            performance.clearMeasures();
            return measure.duration;
        }
    };
};

/**
 * Optimized localStorage wrapper with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {Object} get, set, remove functions
 */
export const createStorageHelper = (key, defaultValue = null) => {
    return {
        get: () => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error(`Error reading from localStorage: ${error}`);
                return defaultValue;
            }
        },
        set: (value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error(`Error writing to localStorage: ${error}`);
                return false;
            }
        },
        remove: () => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error(`Error removing from localStorage: ${error}`);
                return false;
            }
        }
    };
};

/**
 * Optimized event listener with automatic cleanup
 * @param {HTMLElement} element - Element to attach listener to
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object|boolean} options - Event listener options or useCapture
 * @returns {Function} Cleanup function
 */
export const addOptimizedListener = (element, event, handler, options = {}) => {
    const opts = typeof options === 'boolean' ? { capture: options } : options;
    
    // Add passive: true for scroll/touch events if not explicitly set
    const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove'];
    if (passiveEvents.includes(event) && !('passive' in opts)) {
        opts.passive = true;
    }
    
    element.addEventListener(event, handler, opts);
    
    // Return cleanup function
    return () => element.removeEventListener(event, handler, opts);
};

/**
 * Batch multiple function calls into a single execution
 * @param {Function} fn - Function to batch
 * @returns {Function} Batched function
 */
export const batchify = (fn) => {
    let pending = false;
    let args = [];
    
    return function(...newArgs) {
        args.push(newArgs);
        
        if (!pending) {
            pending = true;
            scheduleIdleTask(() => {
                fn(args);
                args = [];
                pending = false;
            });
        }
    };
};

/**
 * Cache function results with expiration
 * @param {Function} fn - Function to cache
 * @param {number} ttl - Time to live in milliseconds
 * @returns {Function} Cached function
 */
export const cacheWithExpiry = (fn, ttl = 3600000) => {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.value;
        }
        
        const result = fn.apply(this, args);
        cache.set(key, {
            value: result,
            timestamp: Date.now()
        });
        
        return result;
    };
};

/**
 * Prevent function from being called too frequently
 * More sophisticated than simple debounce
 * @param {Function} fn - Function to rate limit
 * @param {number} delay - Delay in milliseconds
 * @param {Object} options - Options {leading, trailing}
 * @returns {Function} Rate limited function
 */
export const rateLimit = (fn, delay, options = { leading: true, trailing: true }) => {
    let timeoutId;
    let lastRun = 0;
    
    return function(...args) {
        const now = Date.now();
        const timeSinceLastRun = now - lastRun;
        
        const runFunction = () => {
            lastRun = Date.now();
            fn.apply(this, args);
        };
        
        if (options.leading && timeSinceLastRun >= delay) {
            runFunction();
        } else if (options.trailing) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(runFunction, delay);
        }
    };
};