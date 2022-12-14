# Bitbucat

![logo](./public/img/logo-128.png)

This is an extension app that was created to use Bitbucket like Github.

## Goal

### Features

#### PR Review

1. [x] PR D-Day

![](https://user-images.githubusercontent.com/26294469/187988212-6f5f4ba0-d802-4bef-9484-3d4a9ba17e0c.png)

2. [ ] Combine commits and comments in a timeline ui.

3. [ ] Combine general and file comments.

4. [ ] Taking out a hidden outdated comments.

5. [ ] Synchronize comments with each update.

#### Viewer

1. [ ] Support asciidoc viewer.

2. [ ] Support openapispec(swagger.json) viewer.

3. [ ] Support mermaid Diagram viwer.

### Impossible features

1. [ ] [Multi-line comments](https://www.facebook.com/GitHub/videos/multi-line-comments-have-arrivedyou-can-now-highlight-multiple-lines-in-a-pull-r/2734085156602913/) - bitbucket not supported

2. [ ] [Add Suggestions](https://egghead.io/lessons/github-add-suggestions-in-a-github-pr-review) - bitbucket not supported

## Install

```shell
npm install
```

## Build

```shell
# dev
npm run dev

# deploy
npm run build
```

## Setup

```
# Setup
Chrome/ whale brower -> extension -> load unpacked extension -> select `build` directory
```

## Test

```
# Access chrome://extensions/
# Select 'Uncompressed Extended App Install' and specify 'build' folder
```
