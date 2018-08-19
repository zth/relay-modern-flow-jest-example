/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
export type Grade = "A" | "B" | "C";
import type { FragmentReference } from "relay-runtime";
declare export opaque type SinglePet_pet$ref: FragmentReference;
export type SinglePet_pet = {|
  +id: string,
  +name: string,
  +grade: ?Grade,
  +$refType: SinglePet_pet$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "SinglePet_pet",
  "type": "Pet",
  "metadata": null,
  "argumentDefinitions": [],
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
      "name": "name",
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
};
// prettier-ignore
(node/*: any*/).hash = '766b368e88025e3e4c66b422e68fc713';
module.exports = node;
