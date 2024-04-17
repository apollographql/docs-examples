export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

/** An user's saved cart session. Only one cart can be active at a time */
export type Cart = {
  __typename: "Cart";
  /** Items saved in the cart session */
  items: Maybe<Array<Maybe<Product>>>;
  /** The current total of all the items in the cart, before taxes and shipping */
  subtotal: Maybe<Scalars["Float"]["output"]>;
};

export type Money = {
  __typename: "Money";
  amount: Maybe<Scalars["Float"]["output"]>;
  currency: Maybe<Scalars["String"]["output"]>;
};

/** Returns information about a specific purchase */
export type Order = {
  __typename: "Order";
  /** The user who made the purchase */
  buyer: User;
  /** Each order has a unique id which is separate from the user or items they bought */
  id: Scalars["ID"]["output"];
  /** A list of all the items they purchased. */
  items: Array<Product>;
  /** Calculate the cost to ship all the variants to the users address */
  shippingCost: Maybe<Scalars["Float"]["output"]>;
  total: Maybe<Money>;
};

/** Search filters for when showing an users previous purchases */
export type OrderFilters = {
  itemsInOrder?: InputMaybe<Scalars["Int"]["input"]>;
  orderId: Scalars["ID"]["input"];
  priceHigh?: InputMaybe<Scalars["Float"]["input"]>;
  priceLow?: InputMaybe<Scalars["Float"]["input"]>;
};

/** A specific product sold by our store. This contains all the high level details but is not the purchasable item. */
export type Product = {
  __typename: "Product";
  averageRating: Maybe<Scalars["Float"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  mediaUrl: Maybe<Scalars["String"]["output"]>;
  price: Maybe<Money>;
  reviews: Maybe<Array<Maybe<Review>>>;
  title: Maybe<Scalars["String"]["output"]>;
  weight: Maybe<Scalars["Float"]["output"]>;
};

/** Search filters for when returning Products */
export type ProductSearchInput = {
  titleStartsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type Query = {
  __typename: "Query";
  /** Get a specific order by id. Meant to be used for a detailed view of an order */
  order: Maybe<Order>;
  /** Get a specific product by id. Useful for the product details page or checkout page */
  product: Maybe<Product>;
  /** Top products for home display */
  products: Maybe<Array<Maybe<Product>>>;
  /** Get all available products to shop for. Optionally provide some search filters */
  searchProducts: Maybe<Array<Maybe<Product>>>;
  /**
   * Get the current user from our fake "auth" headers
   * Set the "x-user-id" header to the user id.
   */
  viewer: Maybe<User>;
};

export type QueryorderArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryproductArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerysearchProductsArgs = {
  searchInput?: ProductSearchInput;
};

export type Review = {
  __typename: "Review";
  content: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  rating: Maybe<Scalars["Float"]["output"]>;
};

/** An user account in our system */
export type User = {
  __typename: "User";
  /** The user's active cart session. Once the cart items have been purchases, they transition to an Order */
  cart: Maybe<Cart>;
  id: Scalars["ID"]["output"];
  /** The users previous purchases */
  orders: Maybe<Array<Maybe<Order>>>;
  /** The users current saved shipping address */
  shippingAddress: Maybe<Scalars["String"]["output"]>;
  /** The users login username */
  username: Scalars["String"]["output"];
};

/** An user account in our system */
export type UserordersArgs = {
  filters?: InputMaybe<OrderFilters>;
};

export type ProductsQueryVariables = Exact<{ [key: string]: never }>;

export type ProductsQuery = {
  products: Array<{
    __typename: "Product";
    id: string;
    title: string | null;
    mediaUrl: string | null;
  } | null> | null;
};
