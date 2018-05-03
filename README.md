# Bankaccount workshop

This workshop aims at teaching git during the development of a mid difficult
application.
The purpose is to create an app that allow a user to manage his/her
bank account.
This will be done via a REST API using [restify][url:restify].

[url:restify]: http://restify.org

## Introduction

Assumptions:

* You have zero knowledge about git
* You installed it on your computer (otherwise -> https://git-scm.com)
* You know that git is a version control system, that helps user in
  keeping an history, mainly in development related work, and help
  them to collaborate
* You are not affraid of using the command line (and know how to open it)
* You have an account on gitlab/github (otherwise sign up)
* You have a basic understanding of the HTTP protocol

Git introduces some pieces of vocabulary that requires an introduction.

**Commit**: a commit is the atomic element when using git, we refer to it as
a _version_. In git, every commit has a unique ID generated using the
SHA-1 Hash algorithm.

**Branches**: branches are used as a semantic regroupment of commits. As we will
see later, branches are not a complicated structure and do not require a full
copy of the current workspace (yes I point at you Subversion), they are jus
tags pointing at commits.

**Tags**: Tags are a good way of replacing the non-human redable commit SHA-1
reference with a human reference. It is mainly used to refer to milestones
in the history, so you may see tags named as v0.0.1, etc.

**Merge**/**Rebase**/**Cherry-Pick**: those are all branch operations that we
use to collaborate between branches and collaborators. We might expand a bit
on them later.

## Ascii graphs

During the workshop, I will use a standard way to represent commits, branches
and tags.

      c2    c3
      o-----o  | develop
     /         |
    o c1       | master

In this ascii graph, you can see 2 branches: `master` and `develop`.
they both have commits, described as `c1`, `c2` and `c3`. Please note
that not all graphs will have named commits, since they will be represented
as `o`.

## API endpoints

> **NOTE**
> This part is intended as a reference and documentation, it is not useful
> for the workshop.

I recommend using [cURL](https://curl.haxx.se/) or
[httpie](https://httpie.org/). Every request will have an example given
using cURL, since it is a well-known tool.

### GET `/balance`

Returns the amount of the balance of the user in cents (by default in EUR).

    $ curl http://localhost:3000/balance

#### 200 `application/json`

```json
{
  "balance": {
    "amount": 0,
    "currency": "EUR"
  }
}
```
