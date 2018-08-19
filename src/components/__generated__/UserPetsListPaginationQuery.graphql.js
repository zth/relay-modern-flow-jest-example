/**
 * @flow
 * @relayHash dcc51335c7e8752e5edd863e2fc73de1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type UserPetsList_user$ref = any;
export type UserPetsListPaginationQueryVariables = {|
  count: number,
  cursor?: ?string,
  userId: string,
|};
export type UserPetsListPaginationQueryResponse = {|
  +User: ?{|
    +$fragmentRefs: UserPetsList_user$ref
  |}
|};
export type UserPetsListPaginationQuery = {|
  variables: UserPetsListPaginationQueryVariables,
  response: UserPetsListPaginationQueryResponse,
|};
*/


/*
query UserPetsListPaginationQuery(
  $count: Int!
  $cursor: String
  $userId: ID!
) {
  User(userId: $userId) {
    ...UserPetsList_user
    id
  }
}

fragment UserPetsList_user on User {
  id
  name
  pets(first: $count, after: $cursor) {
    edges {
      node {
        id
        ...SinglePet_pet
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment SinglePet_pet on Pet {
  id
  name
  grade
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "userId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "userId",
    "variableName": "userId",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor",
    "type": "String"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count",
    "type": "Int"
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "UserPetsListPaginationQuery",
  "id": null,
  "text": "query UserPetsListPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $userId: ID!\n) {\n  User(userId: $userId) {\n    ...UserPetsList_user\n    id\n  }\n}\n\nfragment UserPetsList_user on User {\n  id\n  name\n  pets(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        ...SinglePet_pet\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SinglePet_pet on Pet {\n  id\n  name\n  grade\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "UserPetsListPaginationQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "User",
        "storageKey": null,
        "args": v1,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "UserPetsList_user",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UserPetsListPaginationQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "User",
        "storageKey": null,
        "args": v1,
        "concreteType": "User",
        "plural": false,
        "selections": [
          v2,
          v3,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pets",
            "storageKey": null,
            "args": v4,
            "concreteType": "PetConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "PetEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Pet",
                    "plural": false,
                    "selections": [
                      v2,
                      v3,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "grade",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "pets",
            "args": v4,
            "handle": "connection",
            "key": "UserPetsList_pets",
            "filters": null
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '678b530b85a587814f161f2edfe39dbe';
module.exports = node;
