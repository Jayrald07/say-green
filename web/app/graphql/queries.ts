/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPoints = /* GraphQL */ `query GetPoints($radius: Int!, $longitude: Float!, $latitude: Float!) {
  getPoints(radius: $radius, longitude: $longitude, latitude: $latitude) {
    message
    data
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPointsQueryVariables, APITypes.GetPointsQuery>;
