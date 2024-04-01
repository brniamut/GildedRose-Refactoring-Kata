# Steps in solving this problem

#### Reviewing the Description

Firstly, I started by reading the description, going through the Gilded Rose Requirements to understand the problem statement and identify the tools required to run this.

####  Cleaning the Repository

The repository has been forked but naturally contains the problem statement for all languages, which is not entirely necessary. Let's remove everything that isn't needed, leaving only the TypeScript folder.

### Added prettier to make it, well, prettier

Just so I can get that good code-style going on

### Wrote some base tests

I'm using Vitest because I know about it and want to use its coverage feature. The TextTest tool named in the README.md is also a nice tool, but I'll stick to what I'm used to. The Gilded Rose Requirements suggest writing tests one step at a time and not all at once. I agree with this, but I just want the base tests there, so I know I don't break anything basic. I'm suing the previous named requirements to set up these base tests

### First Refactor

So let's do some basics first. I'm removing as many nested if statements as possible and try to move around code that uses inverted boolean logic `(a !== b)` to normal comparisons `(a === b)` and exchange the statements in the `if` and `else` block. This creates a better overview and makes it easier to create a mental modal

### Second Refactor

The result of the previous step shows me three obvious things:

* The first level if statements are almost all about checking the item name
* A lot of checks are about something not being a 'Sulfuras, Hand of Ragnaros'. This could be put it one statement
* Sometimes a check in the second level of an if statement is already checked in the first level if statment.

The quick wins are the last two points so let's do that first

### Third Refactor

I notice that every loop this statement is being run `this.items[i].sellIn = this.items[i].sellIn - 1`. This is of course only the case if the item is not 'Sulfuras, Hand of Ragnaros', but we already fixed that. If we move this statement to the top of the loop it breaks the tests for the special items (Tickets and the Brie Cheese). Well that logic was written with the scenario in mind that we would subtract 1 day after the quality checks. So let's change those if statements too by decreasing the check on sellIn by 1.  

### Forth Refactor

Even more clear now is that there are things happening based upon item name and quality. Apart from the previous step the sellIn values is not adjusted anymore.
The code does things with quality based upon its name. So let's split the loop in a per name part, and let it `continue` if everything is done for that specific item. It will repeat some logic, but will make it clearer to read

### Fifth Refactor
Looking pretty good. Let's do some simple refactors like using '+=' and '-=', inverting some conditionals, and making sure there are no nested if statements

### Sixth Refactor
Let's make this whole thing immutable. Let's use the map function, so that the whole array of items is replaced at once

### Seventh Refactor
Kind of decided that making it immutable is not necessary. It's even better if the Item class itself contains its own update logic. In an ideal world, you could give an update function as a parameter to `new Item()` but because it's not like that, and this is a refactor we do break it up in the class itself

### Final Refactor and check

When checking the test coverage I see that I'm missing two lines. The logic they check is:
* Quality never goes below 0
* For Brie quality should double every day if sellIn is below 0

I add those tests, but I'm not sure if the original code also checked on this, or I introduced it when refactoring. I commit these new tests, checkout the commit with the original code, and check with the current test if this was so.
