/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ReceptacleLocationOutput = {
  __typename: "ReceptacleLocationOutput",
  message?: string | null,
  data?: string | null,
};

export type CreatePointMutationVariables = {
  longitude: number,
  latitude: number,
};

export type CreatePointMutation = {
  createPoint?:  {
    __typename: "ReceptacleLocationOutput",
    message?: string | null,
    data?: string | null,
  } | null,
};

export type GetReceptacleLocationQueryVariables = {
};

export type GetReceptacleLocationQuery = {
  getReceptacleLocation?:  {
    __typename: "ReceptacleLocationOutput",
    message?: string | null,
    data?: string | null,
  } | null,
};

export type OnCreateReceptacleLocationSubscriptionVariables = {
};

export type OnCreateReceptacleLocationSubscription = {
  onCreateReceptacleLocation?:  {
    __typename: "ReceptacleLocationOutput",
    message?: string | null,
    data?: string | null,
  } | null,
};
