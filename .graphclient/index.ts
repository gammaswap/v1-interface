// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { GammaSwapTypes } from './sources/GammaSwap/types';
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
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Loan = {
  id: Scalars['ID'];
  poolId: Scalars['Bytes'];
  tokensHeld: Array<Scalars['BigInt']>;
  heldLiquidity: Scalars['BigInt'];
  liquidity: Scalars['BigInt'];
  lpTokens: Scalars['BigInt'];
  rateIndex: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type LoanData = {
  id: Scalars['ID'];
  poolId: Scalars['Bytes'];
  tokensHeld: Array<Scalars['BigInt']>;
  heldLiquidity: Scalars['BigInt'];
  liquidity: Scalars['BigInt'];
  lpTokens: Scalars['BigInt'];
  rateIndex: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type LoanData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['Bytes']>;
  poolId_not?: InputMaybe<Scalars['Bytes']>;
  poolId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  poolId_contains?: InputMaybe<Scalars['Bytes']>;
  poolId_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokensHeld?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_not?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  heldLiquidity?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_not?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_gt?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_lt?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_gte?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_lte?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  heldLiquidity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity?: InputMaybe<Scalars['BigInt']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokens?: InputMaybe<Scalars['BigInt']>;
  lpTokens_not?: InputMaybe<Scalars['BigInt']>;
  lpTokens_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokens_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokens_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokens_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokens_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokens_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rateIndex?: InputMaybe<Scalars['BigInt']>;
  rateIndex_not?: InputMaybe<Scalars['BigInt']>;
  rateIndex_gt?: InputMaybe<Scalars['BigInt']>;
  rateIndex_lt?: InputMaybe<Scalars['BigInt']>;
  rateIndex_gte?: InputMaybe<Scalars['BigInt']>;
  rateIndex_lte?: InputMaybe<Scalars['BigInt']>;
  rateIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rateIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type LoanData_orderBy =
  | 'id'
  | 'poolId'
  | 'tokensHeld'
  | 'heldLiquidity'
  | 'liquidity'
  | 'lpTokens'
  | 'rateIndex'
  | 'blockNumber';

export type Loan_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['Bytes']>;
  poolId_not?: InputMaybe<Scalars['Bytes']>;
  poolId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  poolId_contains?: InputMaybe<Scalars['Bytes']>;
  poolId_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokensHeld?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_not?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensHeld_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  heldLiquidity?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_not?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_gt?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_lt?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_gte?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_lte?: InputMaybe<Scalars['BigInt']>;
  heldLiquidity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  heldLiquidity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity?: InputMaybe<Scalars['BigInt']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokens?: InputMaybe<Scalars['BigInt']>;
  lpTokens_not?: InputMaybe<Scalars['BigInt']>;
  lpTokens_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokens_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokens_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokens_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokens_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokens_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rateIndex?: InputMaybe<Scalars['BigInt']>;
  rateIndex_not?: InputMaybe<Scalars['BigInt']>;
  rateIndex_gt?: InputMaybe<Scalars['BigInt']>;
  rateIndex_lt?: InputMaybe<Scalars['BigInt']>;
  rateIndex_gte?: InputMaybe<Scalars['BigInt']>;
  rateIndex_lte?: InputMaybe<Scalars['BigInt']>;
  rateIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rateIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Loan_orderBy =
  | 'id'
  | 'poolId'
  | 'tokensHeld'
  | 'heldLiquidity'
  | 'liquidity'
  | 'lpTokens'
  | 'rateIndex'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Pool = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  cfmm: Scalars['Bytes'];
  protocolId: Scalars['BigInt'];
  protocol: Scalars['Bytes'];
  count: Scalars['BigInt'];
};

export type PoolData = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  tokenBalances: Array<Scalars['BigDecimal']>;
  lpTokenBalance: Scalars['BigDecimal'];
  lpTokenBorrowed: Scalars['BigDecimal'];
  lpTokenBorrowedPlusInterest: Scalars['BigDecimal'];
  lpTokenTotal: Scalars['BigDecimal'];
  borrowRate: Scalars['BigDecimal'];
  accFeeIndex: Scalars['BigDecimal'];
  lastFeeIndex: Scalars['BigDecimal'];
  lastBlockNumber: Scalars['BigInt'];
};

export type PoolData_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenBalances?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenBalances_not?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenBalances_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenBalances_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenBalances_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenBalances_not_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpTokenBalance?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpTokenBorrowed?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowed_not?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowed_gt?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowed_lt?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowed_gte?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowed_lte?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowed_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpTokenBorrowed_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpTokenBorrowedPlusInterest?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowedPlusInterest_not?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowedPlusInterest_gt?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowedPlusInterest_lt?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowedPlusInterest_gte?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowedPlusInterest_lte?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenBorrowedPlusInterest_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpTokenBorrowedPlusInterest_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpTokenTotal?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenTotal_not?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenTotal_gt?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenTotal_lt?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenTotal_gte?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenTotal_lte?: InputMaybe<Scalars['BigDecimal']>;
  lpTokenTotal_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpTokenTotal_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  borrowRate?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_not?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  borrowRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  borrowRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  accFeeIndex?: InputMaybe<Scalars['BigDecimal']>;
  accFeeIndex_not?: InputMaybe<Scalars['BigDecimal']>;
  accFeeIndex_gt?: InputMaybe<Scalars['BigDecimal']>;
  accFeeIndex_lt?: InputMaybe<Scalars['BigDecimal']>;
  accFeeIndex_gte?: InputMaybe<Scalars['BigDecimal']>;
  accFeeIndex_lte?: InputMaybe<Scalars['BigDecimal']>;
  accFeeIndex_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  accFeeIndex_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lastFeeIndex?: InputMaybe<Scalars['BigDecimal']>;
  lastFeeIndex_not?: InputMaybe<Scalars['BigDecimal']>;
  lastFeeIndex_gt?: InputMaybe<Scalars['BigDecimal']>;
  lastFeeIndex_lt?: InputMaybe<Scalars['BigDecimal']>;
  lastFeeIndex_gte?: InputMaybe<Scalars['BigDecimal']>;
  lastFeeIndex_lte?: InputMaybe<Scalars['BigDecimal']>;
  lastFeeIndex_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lastFeeIndex_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lastBlockNumber?: InputMaybe<Scalars['BigInt']>;
  lastBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  lastBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PoolData_orderBy =
  | 'id'
  | 'address'
  | 'tokenBalances'
  | 'lpTokenBalance'
  | 'lpTokenBorrowed'
  | 'lpTokenBorrowedPlusInterest'
  | 'lpTokenTotal'
  | 'borrowRate'
  | 'accFeeIndex'
  | 'lastFeeIndex'
  | 'lastBlockNumber';

export type Pool_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  cfmm?: InputMaybe<Scalars['Bytes']>;
  cfmm_not?: InputMaybe<Scalars['Bytes']>;
  cfmm_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cfmm_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cfmm_contains?: InputMaybe<Scalars['Bytes']>;
  cfmm_not_contains?: InputMaybe<Scalars['Bytes']>;
  protocolId?: InputMaybe<Scalars['BigInt']>;
  protocolId_not?: InputMaybe<Scalars['BigInt']>;
  protocolId_gt?: InputMaybe<Scalars['BigInt']>;
  protocolId_lt?: InputMaybe<Scalars['BigInt']>;
  protocolId_gte?: InputMaybe<Scalars['BigInt']>;
  protocolId_lte?: InputMaybe<Scalars['BigInt']>;
  protocolId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocolId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocol?: InputMaybe<Scalars['Bytes']>;
  protocol_not?: InputMaybe<Scalars['Bytes']>;
  protocol_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocol_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocol_contains?: InputMaybe<Scalars['Bytes']>;
  protocol_not_contains?: InputMaybe<Scalars['Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Pool_orderBy =
  | 'id'
  | 'address'
  | 'cfmm'
  | 'protocolId'
  | 'protocol'
  | 'count';

export type Query = {
  user?: Maybe<User>;
  users: Array<User>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  poolData?: Maybe<PoolData>;
  poolDatas: Array<PoolData>;
  loan?: Maybe<Loan>;
  loans: Array<Loan>;
  loanData?: Maybe<LoanData>;
  loanDatas: Array<LoanData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryloanArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryloansArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Loan_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Loan_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryloanDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryloanDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LoanData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LoanData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  user?: Maybe<User>;
  users: Array<User>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  poolData?: Maybe<PoolData>;
  poolDatas: Array<PoolData>;
  loan?: Maybe<Loan>;
  loans: Array<Loan>;
  loanData?: Maybe<LoanData>;
  loanDatas: Array<LoanData>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionloanArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionloansArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Loan_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Loan_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionloanDataArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionloanDatasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LoanData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LoanData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type User = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  depositedPools: Array<Scalars['Bytes']>;
  loans: Array<Scalars['BigInt']>;
};

export type User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  depositedPools?: InputMaybe<Array<Scalars['Bytes']>>;
  depositedPools_not?: InputMaybe<Array<Scalars['Bytes']>>;
  depositedPools_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  depositedPools_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  depositedPools_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  depositedPools_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  loans?: InputMaybe<Array<Scalars['BigInt']>>;
  loans_not?: InputMaybe<Array<Scalars['BigInt']>>;
  loans_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  loans_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  loans_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  loans_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type User_orderBy =
  | 'id'
  | 'address'
  | 'depositedPools'
  | 'loans';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Loan: ResolverTypeWrapper<Loan>;
  LoanData: ResolverTypeWrapper<LoanData>;
  LoanData_filter: LoanData_filter;
  LoanData_orderBy: LoanData_orderBy;
  Loan_filter: Loan_filter;
  Loan_orderBy: Loan_orderBy;
  OrderDirection: OrderDirection;
  Pool: ResolverTypeWrapper<Pool>;
  PoolData: ResolverTypeWrapper<PoolData>;
  PoolData_filter: PoolData_filter;
  PoolData_orderBy: PoolData_orderBy;
  Pool_filter: Pool_filter;
  Pool_orderBy: Pool_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  User_filter: User_filter;
  User_orderBy: User_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Loan: Loan;
  LoanData: LoanData;
  LoanData_filter: LoanData_filter;
  Loan_filter: Loan_filter;
  Pool: Pool;
  PoolData: PoolData;
  PoolData_filter: PoolData_filter;
  Pool_filter: Pool_filter;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  User: User;
  User_filter: User_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type LoanResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Loan'] = ResolversParentTypes['Loan']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokensHeld?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  heldLiquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rateIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoanDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['LoanData'] = ResolversParentTypes['LoanData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokensHeld?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  heldLiquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rateIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pool'] = ResolversParentTypes['Pool']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  cfmm?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  protocolId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  protocol?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PoolData'] = ResolversParentTypes['PoolData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenBalances?: Resolver<Array<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  lpTokenBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  lpTokenBorrowed?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  lpTokenBorrowedPlusInterest?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  lpTokenTotal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  borrowRate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  accFeeIndex?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  lastFeeIndex?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  lastBlockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id' | 'subgraphError'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: Resolver<Maybe<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolArgs, 'id' | 'subgraphError'>>;
  pools?: Resolver<Array<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolData?: Resolver<Maybe<ResolversTypes['PoolData']>, ParentType, ContextType, RequireFields<QuerypoolDataArgs, 'id' | 'subgraphError'>>;
  poolDatas?: Resolver<Array<ResolversTypes['PoolData']>, ParentType, ContextType, RequireFields<QuerypoolDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  loan?: Resolver<Maybe<ResolversTypes['Loan']>, ParentType, ContextType, RequireFields<QueryloanArgs, 'id' | 'subgraphError'>>;
  loans?: Resolver<Array<ResolversTypes['Loan']>, ParentType, ContextType, RequireFields<QueryloansArgs, 'skip' | 'first' | 'subgraphError'>>;
  loanData?: Resolver<Maybe<ResolversTypes['LoanData']>, ParentType, ContextType, RequireFields<QueryloanDataArgs, 'id' | 'subgraphError'>>;
  loanDatas?: Resolver<Array<ResolversTypes['LoanData']>, ParentType, ContextType, RequireFields<QueryloanDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  user?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "user", ParentType, ContextType, RequireFields<SubscriptionuserArgs, 'id' | 'subgraphError'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['User']>, "users", ParentType, ContextType, RequireFields<SubscriptionusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: SubscriptionResolver<Maybe<ResolversTypes['Pool']>, "pool", ParentType, ContextType, RequireFields<SubscriptionpoolArgs, 'id' | 'subgraphError'>>;
  pools?: SubscriptionResolver<Array<ResolversTypes['Pool']>, "pools", ParentType, ContextType, RequireFields<SubscriptionpoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolData?: SubscriptionResolver<Maybe<ResolversTypes['PoolData']>, "poolData", ParentType, ContextType, RequireFields<SubscriptionpoolDataArgs, 'id' | 'subgraphError'>>;
  poolDatas?: SubscriptionResolver<Array<ResolversTypes['PoolData']>, "poolDatas", ParentType, ContextType, RequireFields<SubscriptionpoolDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  loan?: SubscriptionResolver<Maybe<ResolversTypes['Loan']>, "loan", ParentType, ContextType, RequireFields<SubscriptionloanArgs, 'id' | 'subgraphError'>>;
  loans?: SubscriptionResolver<Array<ResolversTypes['Loan']>, "loans", ParentType, ContextType, RequireFields<SubscriptionloansArgs, 'skip' | 'first' | 'subgraphError'>>;
  loanData?: SubscriptionResolver<Maybe<ResolversTypes['LoanData']>, "loanData", ParentType, ContextType, RequireFields<SubscriptionloanDataArgs, 'id' | 'subgraphError'>>;
  loanDatas?: SubscriptionResolver<Array<ResolversTypes['LoanData']>, "loanDatas", ParentType, ContextType, RequireFields<SubscriptionloanDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  depositedPools?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  loans?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Loan?: LoanResolvers<ContextType>;
  LoanData?: LoanDataResolvers<ContextType>;
  Pool?: PoolResolvers<ContextType>;
  PoolData?: PoolDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = GammaSwapTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/GammaSwap/introspectionSchema":
      return import("./sources/GammaSwap/introspectionSchema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const gammaSwapTransforms = [];
const additionalTypeDefs = [] as any[];
const gammaSwapHandler = new GraphqlHandler({
              name: "GammaSwap",
              config: {"endpoint":"http://127.0.0.1:8000/subgraphs/name/GammaSwap"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("GammaSwap"),
              logger: logger.child("GammaSwap"),
              importFn,
            });
sources[0] = {
          name: 'GammaSwap',
          handler: gammaSwapHandler,
          transforms: gammaSwapTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: PoolsQueryDocument,
        get rawSDL() {
          return printWithCache(PoolsQueryDocument);
        },
        location: 'PoolsQueryDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type PoolsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PoolsQueryQuery = { pools: Array<Pick<Pool, 'id' | 'address' | 'cfmm' | 'protocolId' | 'protocol' | 'count'>> };


export const PoolsQueryDocument = gql`
    query PoolsQuery {
  pools {
    id
    address
    cfmm
    protocolId
    protocol
    count
  }
}
    ` as unknown as DocumentNode<PoolsQueryQuery, PoolsQueryQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    PoolsQuery(variables?: PoolsQueryQueryVariables, options?: C): Promise<PoolsQueryQuery> {
      return requester<PoolsQueryQuery, PoolsQueryQueryVariables>(PoolsQueryDocument, variables, options) as Promise<PoolsQueryQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;