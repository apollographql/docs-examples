import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
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
  const { error, data } = useSuspenseQuery(QUERY);

  return (
    <div>
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
