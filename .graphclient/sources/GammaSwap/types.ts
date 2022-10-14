// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace GammaSwapTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

  export type QuerySdk = {
      /** null **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>,
  /** null **/
  pool: InContextSdkMethod<Query['pool'], QuerypoolArgs, MeshContext>,
  /** null **/
  pools: InContextSdkMethod<Query['pools'], QuerypoolsArgs, MeshContext>,
  /** null **/
  poolData: InContextSdkMethod<Query['poolData'], QuerypoolDataArgs, MeshContext>,
  /** null **/
  poolDatas: InContextSdkMethod<Query['poolDatas'], QuerypoolDatasArgs, MeshContext>,
  /** null **/
  loan: InContextSdkMethod<Query['loan'], QueryloanArgs, MeshContext>,
  /** null **/
  loans: InContextSdkMethod<Query['loans'], QueryloansArgs, MeshContext>,
  /** null **/
  loanData: InContextSdkMethod<Query['loanData'], QueryloanDataArgs, MeshContext>,
  /** null **/
  loanDatas: InContextSdkMethod<Query['loanDatas'], QueryloanDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  user: InContextSdkMethod<Subscription['user'], SubscriptionuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Subscription['users'], SubscriptionusersArgs, MeshContext>,
  /** null **/
  pool: InContextSdkMethod<Subscription['pool'], SubscriptionpoolArgs, MeshContext>,
  /** null **/
  pools: InContextSdkMethod<Subscription['pools'], SubscriptionpoolsArgs, MeshContext>,
  /** null **/
  poolData: InContextSdkMethod<Subscription['poolData'], SubscriptionpoolDataArgs, MeshContext>,
  /** null **/
  poolDatas: InContextSdkMethod<Subscription['poolDatas'], SubscriptionpoolDatasArgs, MeshContext>,
  /** null **/
  loan: InContextSdkMethod<Subscription['loan'], SubscriptionloanArgs, MeshContext>,
  /** null **/
  loans: InContextSdkMethod<Subscription['loans'], SubscriptionloansArgs, MeshContext>,
  /** null **/
  loanData: InContextSdkMethod<Subscription['loanData'], SubscriptionloanDataArgs, MeshContext>,
  /** null **/
  loanDatas: InContextSdkMethod<Subscription['loanDatas'], SubscriptionloanDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["GammaSwap"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
