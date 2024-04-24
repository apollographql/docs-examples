import { graphql, HttpResponse } from "msw";
import { execute } from "graphql";
import type { ExecutionResult } from "graphql";
import type { ObjMap } from "graphql/jsutils/ObjMap";
import { gql } from "@apollo/client";
import { createTestSchema } from "@apollo/client/testing/experimental";
import { makeExecutableSchema } from "@graphql-tools/schema";
import graphqlSchema from "../../../schema.graphql";

const staticSchema = makeExecutableSchema({ typeDefs: graphqlSchema });

export let schemaProxy = createTestSchema(staticSchema, {
  resolvers: {
    Query: {
      products: () => [
        {
          id: "1",
          title: "Blue Jays Hat",
        },
      ],
    },
  },
  scalars: {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "string",
  },
});

export function replaceSchema(newSchema: typeof schemaProxy) {
  const oldSchema = schemaProxy;
  schemaProxy = newSchema;

  function restore() {
    schemaProxy = oldSchema;
  }

  return Object.assign(restore, {
    [Symbol.dispose]() {
      restore();
    },
  });
}

export const handlers = [
  graphql.operation<ExecutionResult<ObjMap<unknown>, ObjMap<unknown>>>(
    async ({ query, variables, operationName }) => {
      const document = gql(query);

      const result = await execute({
        document,
        operationName,
        schema: schemaProxy,
        variableValues: variables,
      });

      return HttpResponse.json(result);
    }
  ),
];
