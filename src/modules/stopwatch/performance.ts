export function getPerformance() {
  let performance = null;
  if (typeof window !== 'undefined' && window.performance) {
    performance = window.performance;
  } else if (process?.versions?.node) {
    const NODE_MAJOR_VERSION = Number(process.versions.node.split('.')[0]);
    const NODE_MINOR_VERSION = Number(process.versions.node.split('.')[1]);
    if ((NODE_MAJOR_VERSION === 8 && NODE_MINOR_VERSION >= 5) || NODE_MAJOR_VERSION > 8) {
      performance = require('perf_hooks').performance;
    }
  }
  return performance;
}
