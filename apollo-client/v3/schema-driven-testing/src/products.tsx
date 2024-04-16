import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { TestQuery } from "./__generated__/api";

const QUERY: TypedDocumentNode<TestQuery> = gql`
  query TestQuery {
    products {
      ...DimensionsAndVariation
      id
    }
  }
  fragment DimensionsAndVariation on Product {
    mediaUrl
    weight
    title
    price {
      amount
      currency
    }
  }
`;

export default function NonDeferredQuery() {
  const { loading, error, data } = useQuery(QUERY);

  return (
    <div>
      {loading ? <p>Loading...</p> : ""}
      {error ? <p>Error :(</p> : ""}
      {data?.products?.map((product) => {
        if (!product) return null;
        return (
          <div key={product.id}>
            <b>
              {product.id} - {product.mediaUrl}
            </b>
          </div>
        );
      })}
    </div>
  );
}
