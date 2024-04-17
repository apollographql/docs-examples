import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { ProductsQuery } from "./__generated__/api";

const QUERY: TypedDocumentNode<ProductsQuery> = gql`
  query ProductsQuery {
    products {
      id
      title
      mediaUrl
    }
  }
`;

export function Products() {
  const { loading, error, data } = useQuery(QUERY);

  return (
    <div>
      {loading ? <p>Loading...</p> : ""}
      {error ? <p>Error :(</p> : ""}
      {data?.products?.map((product) => {
        if (!product) return null;
        return (
          <div key={product.id}>
            <p>{product.title}</p>
            <b>
              {product.id} - {product.mediaUrl}
            </b>
          </div>
        );
      })}
    </div>
  );
}
