# Sanity

Queries are defined in `src/sanity/lib/queries.ts` using GROQ `defineQuery`. This is important for generating types.

## Using Sanity Typegen

First, we need to run:

```bash
npx sanity@latest schema extract
```

This will generate a `schema.json` file in the root directory.

Then we need to create a file sanity.typegen.json:

```json
{
	"path": "./src/**/*.{astro,ts,tsx}",
	"schema": "./schema.json",
	"generates": "./src/types/sanity.types.ts"
}
```

Then run:

```bash
npx sanity@latest typegen generate
```

This uses the `sanity-typegen.json` file to:

- Locate the `schema.json`
- Identify paths to look for chemaTypes and GROQ queries
- Specify the path where the types will be generated
