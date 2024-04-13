/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getReceptacleLocation = /* GraphQL */ `query GetReceptacleLocation {
  getReceptacleLocation {
    message
    data
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetReceptacleLocationQueryVariables,
  APITypes.GetReceptacleLocationQuery
>;
