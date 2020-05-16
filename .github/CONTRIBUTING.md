# Contributing to Chakra UI Vue

Thanks for being interested in contributing! We're so glad you want to help!

We want contributing to Chakra UI Vue to be enjoyable, and educational for anyone
and everyone. All contributions are welcome, including issues, new docs, as well
as updates and tweaks, blog posts, workshops, and more.

When contributing to this repository, please first discuss the change you wish
to make via issue, email, or any other method with the owners of this repository
before making a change.

Please note we have a code of conduct, please follow it in all your interactions
with the project.

## Getting started

Please create a new branch from an up to date master on your fork. (Note, urgent
hotfixes should be branched off the latest stable release rather than master)

- Fork the Chakra UI Vue repository on Github
- Clone your fork to your local machine
  `git clone git@github.com:<yourname>/chakra-ui-vue.git`
- Create a branch `git checkout -b my-feature-branch`
- Make your changes, lint, then push to to GitHub with
  `git push --set-upstream origin my-feature-branch`.
- Visit GitHub and make your pull request.

If you have an existing local repository, please update it before you start, to
minimise the chance of merge conflicts.

```sh
git remote add upstream git@github.com:chakra-ui/chakra-ui-vue.git
git checkout master
git pull upstream master
git checkout -b my-feature-branch
```

You can now access the documentation site locally. Changes to the docs will hot
reload the site.

## Code Contribution

Project setup

```sh
yarn bootstrap # Installs all dependencies and links packages
yarn dev # Runs dev build
```

### Component Development

```sh
yarn storybook # Starts storybook
```

### Tests

```sh
yarn test # Runs tests
```

## Docs contribution

Chakra UI uses NuxtJS for its documentation website. Thank you in advance and
cheers for contributing to our documentation! We created a simple command to run
it.

```sh
yarn docs:dev
```

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of
experience, nationality, personal appearance, race, religion, or sexual identity
and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Enforcement

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 1.4, available at
[https://contributor-covenant.org/version/1/4][version]

[homepage]: https://contributor-covenant.org
[version]: https://contributor-covenant.org/version/1/4/


When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.
