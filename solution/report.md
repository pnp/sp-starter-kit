# Upgrade project solution to v1.6.0

Date: 2018-9-11

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.6.0.

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.6.0"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN012012 tsconfig.json include property | Required

Update tsconfig.json include property

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "include": [
    "src/**/*.ts"
  ]
}
```

File: [./tsconfig.json](./tsconfig.json)

## Summary

### Execute script

```sh

```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.6.0"
  }
}
```

#### [./tsconfig.json](./tsconfig.json)

```json
{
  "include": [
    "src/**/*.ts"
  ]
}
```
