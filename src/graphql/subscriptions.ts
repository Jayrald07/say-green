/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../types";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateReceptacleLocation =
  /* GraphQL */ `subscription OnCreateReceptacleLocation {
  onCreateReceptacleLocation {
    message
    data
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnCreateReceptacleLocationSubscriptionVariables,
    APITypes.OnCreateReceptacleLocationSubscription
  >;
