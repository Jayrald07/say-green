/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../types";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createReceptacleLocation =
  /* GraphQL */ `mutation CreateReceptacleLocation($longitude: Float!, $latitude: Float!) {
  createReceptacleLocation(longitude: $longitude, latitude: $latitude) {
    message
    data
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateReceptacleLocationMutationVariables,
    APITypes.CreateReceptacleLocationMutation
  >;
export const deleteReceptacleLocation =
  /* GraphQL */ `mutation DeleteReceptacleLocation($hash: String!) {
  deleteReceptacleLocation(hash: $hash) {
    message
    data
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteReceptacleLocationMutationVariables,
    APITypes.DeleteReceptacleLocationMutation
  >;
