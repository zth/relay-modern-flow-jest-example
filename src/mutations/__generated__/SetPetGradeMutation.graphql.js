/**
 * @flow
 * @relayHash a74da22e15091e03a426cfb84e2f9c7d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Grade = "A" | "B" | "C";
export type SetPetGradeInput = {
  petId: string,
  grade: Grade,
};
export type SetPetGradeMutationVariables = {|
  input: SetPetGradeInput
|};
export type SetPetGradeMutationResponse = {|
  +setPetGrade: ?{|
    +pet: {|
      +id: string,
      +grade: ?Grade,
    |}
  |}
|};
export type SetPetGradeMutation = {|
  variables: SetPetGradeMutationVariables,
  response: SetPetGradeMutationResponse,
|};
*/


/*
mutation SetPetGradeMutation(
  $input: SetPetGradeInput!
) {
  setPetGrade(input: $input) {
    pet {
      id
      grade
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SetPetGradeInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "setPetGrade",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SetPetGradeInput!"
      }
    ],
    "concreteType": "SetPetGradePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "pet",
        "storageKey": null,
        "args": null,
        "concreteType": "Pet",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "grade",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SetPetGradeMutation",
  "id": null,
  "text": "mutation SetPetGradeMutation(\n  $input: SetPetGradeInput!\n) {\n  setPetGrade(input: $input) {\n    pet {\n      id\n      grade\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SetPetGradeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SetPetGradeMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '40a019c3999f7fdff2d901c7b5b3be29';
module.exports = node;
