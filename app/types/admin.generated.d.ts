/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type CheckoutProfilesQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type CheckoutProfilesQuery = { checkoutProfiles: { nodes: Array<Pick<AdminTypes.CheckoutProfile, 'id' | 'isPublished'>> } };

interface GeneratedQueryTypes {
  "#graphql\n    query CheckoutProfiles {\n      checkoutProfiles(first:50) {\n        nodes {\n          id\n          isPublished\n        }\n      }\n    }\n  ": {return: CheckoutProfilesQuery, variables: CheckoutProfilesQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
