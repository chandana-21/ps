# Change Log

## 2025-12-04
- **Fixed:** Cleared Vite cache (`node_modules/.vite`) to resolve module export error. The error "The requested module '/src/components/IssueCard.jsx' does not provide an export named 'default'" was caused by stale cache - the file itself had the correct export.

