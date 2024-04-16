import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  generates: {
    "./src/__generated__/resolvers-types.ts": {
      schema: "./schema.graphql",
      config: {
        useIndexSignature: true,
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
    "./src/__generated__/api.ts": {
      schema: "./schema.graphql",
      documents: ["src/**/*.{ts,tsx}"],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
        dedupeOperationSuffix: true,
        defaultScalarType: "unknown",
        nonOptionalTypename: true,
        omitOperationSuffix: true,
        skipTypeNameForRoot: true,
        scalars: {
          CountryCode: "string",
          DateTime: "string",
          ErrorRate: "number",
          ID: "string",
          Timestamp: "number",
        },
        namingConvention: {
          typeNames: "keep",
        },
      },
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
