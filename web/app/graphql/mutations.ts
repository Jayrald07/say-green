/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createPoint = /* GraphQL */ `mutation CreatePoint($longitude: Float!, $latitude: Float!) {
  createPoint(longitude: $longitude, latitude: $latitude) {
    message
    data
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePointMutationVariables,
  APITypes.CreatePointMutation
>;
