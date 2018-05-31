# Bankaccount workshop

This workshop aims at teaching git during the development of a mid difficult
application.
The purpose is to create an app that allow a user to manage his/her
bank account.
This will be done via a REST API using [restify][url:restify].

[url:restify]: http://restify.org

## How to start?

First thing to start the project, fork it (in github), and clone your fork. Move
inside the directory and move the git history to the point named init.

    $ git clone https://github.com/jquagliatini/git-ws.git
    $ cd git-ws
    $ git checkout init
    $ git checkout -b develop

## Part 3/

You may argue that a bank account that works with a dynamic balance is
not realistic. As a really smart person, you are well aware that most
bank accounts works in a transaction manner. This is a really different system.
Basically, a transaction, is just an operation, at a given time.
In order to simplify, we will say that the only operation possible on our
account is `add`, and that a `sub` operation would be an `add` with
a negative amount.

Your bank account requires a Ledger that list all the transactions.
When you ask for your balance, you are asking the ledger to go over
each transaction, and sum each amount in every transaction.

We can image this with:

```json
{
  "ledger": [
    { "amount": 100, "currency": "EUR", "date": "2018-08-11T08:12:34" },
    { "amount": 1234567, "currency": "EUR", "date": "2018-04-02T12:38:54" },
    { "amount": -947000, "currency": "EUR", "date": "2018-04-01T16:02:21" }
  ]
}
```

In this case the balance would be 287667 cents of euros, 2876.67€.
We obtained that value by reducing the set of transactions in the ledger,

    100
    + 1234567
    + (- 947000)
    = 287667

Getting the balance is as simple as doing

```js
const balance = transactions.ledger.reduce((sum, t) => ({
  amount: sum.amount + t.amount,
  currency: t.currency,
}));
```

> **WARNING**: Be aware, that a single account contains thousands if not more
> transactions, and the upper implementation may not be the best solution.

Your goal, in this part is to implement the `src/models/Ledger.ts` `sum()`
method. `sum()` is used as the default function for the `getBalance()` operation
in `src/models/BankAccount.ts`. As you notice in this class, the user
doesn't know which implementation you took, so she/he called multiple times
the `sum()` operation. Think about it in your implementation (of course you
won't see much difference in this example, but still optimize your code).

Every developer will implement with its own optimization. In the end, try
to share you work with a _Pull request_. You will discuss in the
newly created thread, on how to optimize the function and treat edge cases.
This step is here to create conflicts in merge operations, and
to understant that github, is mainly used for such cases, to discuss on which
implementation should be finally added to the product.

Once everything is merged, just launch the REST API

    $ npm start
    ...
    server listens on 3000

After that just try the following commands you should have _exactly_ the same
output (appart from the `d` field).

    $ curl http://localhost:3000/h
    []

    $ curl -XPUT \
      -H'Content-Type: application/json' \
      --date '{ "amount": 100 }' \
      http://localhost:3000/add
    {"balance":{"amount":100,"currency":"EUR"}}

    $ curl http://localhost:3000/h
    [{"id":0,"_href":"/t/0","a":{"_":100","c":"EUR","s":"1.00EUR"},"d":1527753723043}]

    $curl http://localhost:3000/t/0
    {"id":0,"a":{"_":100","c":"EUR","s":"1.00EUR"},"d":1527753723043}

If you have that expected output, **CONGRATULATIONS** you just
finished that tutorial!

![](https://media.giphy.com/media/ely3apij36BJhoZ234/giphy.gif)

> That's all folks!

## Part 2/

Now that you started implementing everything inside you BankAccount model,
let's remove the operation logic and the Currency into dedicated model classes.

You'll see new classes and interfaces (Typescript interfaces are typed JSON).

* `models/Amount.ts`
* `models/currency/Currency.ts`
* `models/currency/impl/EurCurrency.ts`
* `models/currency/impl/UsDollarCurrency.ts`
* `models/currency/errors/CurrencyError.ts`

Basically, `BankAccount` has an Amount that is defined by a Currency.
Currency is a basic JSON defining a structure to change the behaviour
of an Amount. Amount is an immutable object, meaning that each operation
leads to the creation of a brand new object.

In this quick part, just implement `add` and `sub` in `Amount`.
An interesting organization would be to share the workload.
If you are in two, one could implement `add`, while the other `sub`.
After each implementation try to refactor.

To share your work you must update the remote repository,
to do so just type

    $ git push origin develop

To share your work, try to open a _Pull Refactor_ on the other developer
fork. After that pair program to refactor.
If you are a bit lost on that "Pull Request" take a look at the [official
guide from github](https://guides.github.com/activities/hello-world/#pr).
The [forking guide is also of great value!](https://guides.github.com/activities/hello-world/#pr).
(do not hesitate to look at other ones).

Bascially what you will do is open a request to the other developer to pull
your code from your repository. When you fork you just
create a copy of the initial repository, but github keeps a special link
between the two. When you open that pull request, github will automatically
propose to merge your work inside the initial repository, often refered to
as **upstream**. Though, since you initially forked my repo, you will need
to change the base fork to the other developer fork. Doing so you will be
able to merge your changes.

When done, each test should pass.
A condition to continue is that each developer
is in the same state. If you opened a pull request,
try to use the the developer repo as a remote named `upstream`. To do so

    $ git remote add upstream UPSTREAM_URL.git

then, you can update your state by

    $ git pull upstream

When everyone is in the same state, just continue with

    $ git merge part-3

## Part 1/

This part is here for you to familiarize with the code base (typescript).
If you don't have it already installed, you should install [nodejs][url:node]
and a pakackage manager like [yarn][url:yarn] (you can use npm if you prefer
but I used yarn). You should also read the [introduction](#introduction) part.

Once you have the environment, just do a

    $ yarn install

you should see a `node_modules/` folder.
To test that everything is operational, do

    $ yarn test

If everything goes well, **you should have errors**.

    Tests:       2 failed, 5 passed, 7 total

Open you favorite text editor (VS code, sublime, atom, vim...), and start
looking inside the [`src/models/BankAccount.ts`](file:ba) file. `models/` will
be the only folder that you are going to modify.

You will see that tests are given inside
[`test/models/BankAccount.spec.ts`][file:batest].
You should not modify this file, since this workshop is in a TDL
(_Test Driven Learning_) format. Basically, every part you will have to code
the model to pass all the tests (integration and unit tests).

For this part implement the remaining features from the following list:

* [x] As a user I can display the amount of money currently available in my
      bank account
* [ ] As a user I can add an amount of money in my bank account
* [ ] As a user I can withdraw money from my bank account

To configure your git environment you should define a username and email.
It is a best practice to define the email as the email defined in github.
You can choose any username you like, though you might prefer to stick with
the one you chose on github. To do it run

    $ git config --global user.name '<USERNAME>'
    $ git config --global user.email '<USER_EMAIL>'

do not forget to replace `USERNAME` and `USER_EMAIL` with your login and email.
Note that the `--global` flag is here to modify the global configuration. If
you use multiple accounts on your computer and you don't want to pollute your
global configuration just remove `--global` from the command line above.

Once every test is _OK_, and you want to create a version of you source code,
you should do the following command:

    $ git add src/models/BankAccount.ts

This will indicate to git to take in account the modifications of the
`BankAccount.ts` file. Though, the real purpose of `git add` is to add,
as the name imply, the file into the git index. See it as a temporary
version, or a partial version.

    File System    Git Index      Git Version
    -----------    ---------      ------------
        |              |                |
        |    git add   |                |
        |------------->|                |
        |              |   git commit   |
        |              |--------------->|

Once you are ready to create a snapshot/version/commit of your current
modifications (only those in the index), you can use the `commit` command.

    $ git commit

This will open a text editor (by default it can be vim), this will allow you
to describe the modification. So feel free to describe it extensively.
Usually the main description should take less than 80 character. You can
be more precise in the optional description. To use it just separate the
main description from the optional one with an empty line

    <MAIN DESCRTIPION> (less than 80 chrs.)
    (... empty line)
    <OPTIONAL DESCRIPTION> (as many chrs as you want)*

When everything is operational, just merge with the next step. To do so:

    $ git merge part-2

which will merge your modifications as follow:

        o---o---o---o  | develop
       /           /   |
      o--- ... ---o    | master
    [init]      [part-2]

[url:node]: https://nodejs.org
[url:yarn]: https://yarnpkg.com
[file:ba]: src/models/BankAccount.ts
[file:batest]: test/models/BankAccount.spec.ts

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

### PUT `/add`

### PUT `/sub`

Add or substract an amount in the bankaccount.

    $ curl -XPUT \
      -H 'Content-Type: application/json' \
      --data '{ "amount": 100 }' \
      http://localhost:3000/add

    $ curl -XPUT \
      -H 'Content-Type: application/json' \
      --data '{ "amount": 100 }' \
      http://localhost:3000/sub

### 200 `application/json`

```json
{
  "balance": {
    "amount": 10000,
    "currency": "EUR"
  }
}
```

### GET `/h`

Return the account transaction history.
You can use the query param `page` (1 indexed) to
display transactions, 10 by 10.

    $ curl http://localhost:3000/h

    $ curl http://localhost:3000/h?page=2

### 200 `application/json`

```json
[
  {
    "id": 0,
    "_href": "/t/0",
    "a": {
      "_": 100,
      "c": "EUR",
      "s": "1.00EUR"
    },
    "d": 1527686892178
  }
]
```

### GET `/t/:txId`

Returns a specific transaction.

    $ curl http://localhost:3000/t/0

### 200 `application/json`

```json
{
  "id": 0,
  "a": {
    "_": 100,
    "c": "EUR",
    "s": "1.00EUR"
  },
  "d": 1527686892178
}
```
