// @flow

/**
 * Using testIDs to avoid coupling testing to class names, id's or other
 * "non-test" properties are good for both Enzyme testing and e2e-testing
 * where you need to access the actual rendered element from the outside.
 *
 * This is just a convenience wrapper around getting selectors for the
 * test IDs.
 */

export function testIdSelector(id: string): string {
  return `[data-testid="${id}"]`;
}