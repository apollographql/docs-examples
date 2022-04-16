import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** A dog is a kind of dog. */
export type Dog = {
  __typename?: 'Dog';
  /** How old the dog is */
  age: Scalars['Int'];
  /** The breed of the dog */
  breed: Scalars['String'];
  id: Scalars['ID'];
  /** The name of the dog */
  name: Scalars['String'];
};

/** The fields necessary to add a new dog */
export type DogInput = {
  /** How old the dog is */
  age: Scalars['Int'];
  /** The breed of the dog */
  breed: Scalars['String'];
  /** The name of the dog */
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a new dog to the list of dogs */
  addDog: AddDogMutationResponse;
};


export type MutationAddDogArgs = {
  dogInfo: DogInput;
};

export type Query = {
  __typename?: 'Query';
  /** Returns a list of all of the dogs */
  getDogs: Array<Dog>;
};

/** The mutation response to adding a new dog */
export type AddDogMutationResponse = {
  __typename?: 'addDogMutationResponse';
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars['Int'];
  /** The added dog */
  dog?: Maybe<Dog>;
  /** Human-readable message for the UI */
  message: Scalars['String'];
  /** Indicates whether the mutation was successful */
  success: Scalars['Boolean'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Dog: ResolverTypeWrapper<Dog>;
  DogInput: DogInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  addDogMutationResponse: ResolverTypeWrapper<AddDogMutationResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Dog: Dog;
  DogInput: DogInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  addDogMutationResponse: AddDogMutationResponse;
}>;

export type DogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dog'] = ResolversParentTypes['Dog']> = ResolversObject<{
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  breed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addDog?: Resolver<ResolversTypes['addDogMutationResponse'], ParentType, ContextType, RequireFields<MutationAddDogArgs, 'dogInfo'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getDogs?: Resolver<Array<ResolversTypes['Dog']>, ParentType, ContextType>;
}>;

export type AddDogMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['addDogMutationResponse'] = ResolversParentTypes['addDogMutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dog?: Resolver<Maybe<ResolversTypes['Dog']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Dog?: DogResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  addDogMutationResponse?: AddDogMutationResponseResolvers<ContextType>;
}>;

