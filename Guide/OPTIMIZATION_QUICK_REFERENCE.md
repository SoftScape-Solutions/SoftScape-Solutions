# JavaScript Optimization Quick Reference

## 🚀 Quick Start Guide

### Import Optimized Utilities

```javascript
import {
  debounce,
  throttle,
  memoize,
  scheduleIdleTask,
  createLazyObserver,
  profiler,
  createStorageHelper,
  addOptimizedListener,
  cacheWithExpiry
} from './utils/helpers';

import { runInWorker, WorkerPool } from './utils/workerHelper';
```

---

## 📖 Common Use Cases

### 1. Debounce User Input
```javascript
const handleSearch = debounce((query) => {
  // API call
  searchAPI(query);
}, 300);

<input onChange={(e) => handleSearch(e.target.value)} />
```

### 2. Throttle Scroll Events
```javascript
useEffect(() => {
  const handleScroll = throttle(() => {
    console.log('Scrolled!');
  }, 100);
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 3. Memoize Expensive Calculations
```javascript
const expensiveCalc = memoize((data) => {
  // Heavy computation
  return result;
});

const result = expensiveCalc(data); // Cached after first call
```

### 4. Use Web Workers for Heavy Tasks
```javascript
// For large data processing
const sorted = await sortInWorker(largeArray);

// Using worker pool
const pool = new WorkerPool('./worker.js', 4);
const result = await pool.execute(data);
pool.terminate(); // Cleanup
```

### 5. Schedule Non-Critical Tasks
```javascript
scheduleIdleTask(() => {
  // Analytics, logging, etc.
  trackAnalytics();
});
```

### 6. Lazy Load Components
```javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### 7. Optimize Event Listeners
```javascript
useEffect(() => {
  const cleanup = addOptimizedListener(
    window,
    'scroll',
    handleScroll
  );
  return cleanup;
}, []);
```

### 8. Cache API Responses
```javascript
const fetchData = cacheWithExpiry(async (id) => {
  const res = await fetch(`/api/data/${id}`);
  return res.json();
}, 3600000); // 1 hour cache

const data = await fetchData(123); // Cached
```

### 9. Profile Performance
```javascript
const profile = profiler('MyOperation');

profile.start();
// ... operation
profile.end(); // Logs: "MyOperation: 45.23ms"
```

### 10. Optimize LocalStorage
```javascript
const storage = createStorageHelper('myData', []);

const data = storage.get();     // Safe, returns [] on error
storage.set(newData);           // Returns boolean
storage.remove();               // Safe removal
```

---

## 🎯 Performance Patterns

### React Components

```javascript
// Use memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Heavy render
  return <div>...</div>;
});

// Use useMemo for expensive calculations
const processedData = useMemo(() => {
  return expensiveProcess(data);
}, [data]);

// Use useCallback for event handlers
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

### Loops

```javascript
// ✅ Good
const len = array.length;
for (let i = 0; i < len; i++) {
  process(array[i]);
}

// ❌ Avoid
array.forEach(item => process(item)); // Slower for large arrays
```

### DOM Manipulation

```javascript
// ✅ Batch updates
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const el = document.createElement('div');
  el.textContent = item;
  fragment.appendChild(el);
});
container.appendChild(fragment);

// ❌ Avoid
items.forEach(item => {
  const el = document.createElement('div');
  el.textContent = item;
  container.appendChild(el); // Causes reflow each time
});
```

---

## ⚠️ Common Mistakes to Avoid

### 1. Creating Functions in Loops
```javascript
// ❌ Bad
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', function() {
    // New function each iteration
  });
}

// ✅ Good
const handleClick = (i) => {
  // Handle click
};

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', () => handleClick(i));
}
```

### 2. Not Cleaning Up
```javascript
// ❌ Bad
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  // No cleanup!
}, []);

// ✅ Good
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 3. Accessing DOM Repeatedly
```javascript
// ❌ Bad
for (let i = 0; i < 100; i++) {
  document.getElementById('myEl').style.color = colors[i];
}

// ✅ Good
const el = document.getElementById('myEl');
for (let i = 0; i < 100; i++) {
  el.style.color = colors[i];
}
```

---

## 📊 When to Use What

| Scenario | Solution | Why |
|----------|----------|-----|
| User typing in search | Debounce (300ms) | Wait for user to finish |
| Scroll event | Throttle (100ms) | Limit calls while scrolling |
| Expensive calculation | Memoize | Cache results |
| Data processing > 50ms | Web Worker | Don't block UI |
| Non-critical task | scheduleIdleTask | Better frame rate |
| API response | cacheWithExpiry | Reduce network calls |
| Heavy component | React.lazy | Reduce bundle size |
| Array iteration | for loop | Faster than forEach |

---

## 🔍 Debugging Performance

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Performance tab
3. Record interaction
4. Look for:
   - Long tasks (> 50ms)
   - Layout thrashing
   - Memory leaks
   - Excessive re-renders

### Lighthouse
```bash
# CLI
npm install -g lighthouse
lighthouse https://yoursite.com --view

# Or use Chrome DevTools Lighthouse tab
```

### React DevTools Profiler
1. Install React DevTools extension
2. Go to Profiler tab
3. Record interaction
4. Analyze component render times

---

## 📈 Performance Budget

### Target Metrics
- **First Contentful Paint:** < 1.8s
- **Time to Interactive:** < 3.0s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

### Bundle Sizes
- JavaScript: < 200KB (gzipped)
- CSS: < 50KB (gzipped)
- Total: < 300KB (gzipped)

---

## 🛠️ Tools

### Build Tools
- **Vite** - Fast builds, optimized output
- **Terser** - JavaScript minification
- **PostCSS** - CSS optimization

### Analysis
- **webpack-bundle-analyzer** - Visualize bundle size
- **Lighthouse** - Performance audits
- **Chrome DevTools** - Profiling

### Monitoring
- **Web Vitals** - Core metrics library
- **Performance Observer API** - Real user monitoring

---

## 📚 Further Reading

- [Web.dev Performance](https://web.dev/performance/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/performance.html)

---

**Last Updated:** October 21, 2025
