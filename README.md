# Spear Education Build Variables
*Note: This action is designed to be compatible within Spear's ecosystem.

Parses the action environment

## Outputs

### `release`
The release name, taken from the branch or tag.
Examples:
- `2021-12-01.01`
- `gl-1234`

### `appEnv`
The APP Environment, taken from the branch or tag.
Examples:
- `staging`
- `sandbox`
- `dotco`
- `production`

## Example usage
```
- id: build-vars
  uses: speareducation/action-build-variables@main

- id: other-action
  env:
    release: ${{ steps.build-vars.outputs.release }}
    appEnv: ${{ steps.build-vars.outputs.appEnv }}
```