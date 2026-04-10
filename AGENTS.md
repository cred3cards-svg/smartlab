<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repository Bookmarks

## Next.js 16 Patterns
- **Dynamic Params**: Always use `Promise` for `params` in routes and pages. Await them before use.
- **Handlers**: Use `NextRequest` and `context: { params: Promise<{ id: string }> }` for API routes.

## Prisma 7 + Neon Patterns
- **Adapter**: Use `new PrismaNeon({ connectionString })` directly. Do not manually initialize a `Pool` unless specific pool management is required.
- **Enums**: Always use imported Prisma enums (e.g., `ReferralStatus.PENDING`) instead of literal strings in `create` or `update` blocks to ensure type safety.

## Component Patterns
- **Typing**: Ensure UI components (like `DiscountBadge`) have explicit prop types for size variants (sm|md|lg) when they are reused across different page contexts.
