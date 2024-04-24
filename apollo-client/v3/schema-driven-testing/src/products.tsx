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
  const { data } = useSuspenseQuery(QUERY);

  return (
    <div>
      {data.products?.map((product) => {
        if (!product) return null;
        return (
          <p key={product.id}>
            <a href={product.mediaUrl || ""}>
              {product.title} - {product.id}
            </a>
          </p>
        );
      })}
    </div>
  );
}
