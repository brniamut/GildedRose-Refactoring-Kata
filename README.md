# Steps in solving this problem

#### Reviewing the Description

Firstly, I started by reading the description, going through the Gilded Rose Requirements to understand the problem statement and identify the tools required to run this.

####  Cleaning the Repository

The repository has been forked but naturally contains the problem statement for all languages, which is not entirely necessary. Let's remove everything that isn't needed, leaving only the TypeScript folder.

### Added prettier to make it, well, prettier

Just so I can get that good code-style going on

### Wrote some base tests

I'm using Vitest because I know about it and want to use its coverage feature. The TextTest tool named in the README.md is also a nice tool, but I'll stick to what I'm used to. The Gilded Rose Requirements suggest writing tests one step at a time and not all at once. I agree with this, but I just want the base tests there, so I know I don't break anything basic. I'm suing the previous named requirements to set up these base tests

### First refactor

So let's do some basics first. I'm removing as many nested if statements as possible and try to move around code that uses inverted boolean logic `(a !== b)` to normal comparisons `(a === b)` and exchange the statements in the `if` and `else` block. This creates a better overview and makes it easier to create a mental modal

### Second refactor

The result of the previous step shows me three obvious things:

* The first level if statements are almost all about checking the item name
* A lot of checks are about something not being a 'Sulfuras, Hand of Ragnaros'. This could be put it one statement
* Sometimes a check in the second level of an if statement is already checked in the first level if statment.

The quick wins are the last two points so let's do that first


