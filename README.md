# Steps in Refactoring

### Introduction
In this guide, I detail my step-by-step process of refactoring the Gilded Rose Kata, starting from understanding the problem to systematically improving the code's structure and readability. Each stage of my work is documented in commits, which serve as a roadmap to my thought process. I recommend following these commits for insight into each decision made.

### Steps

#### Reviewing the Description

First, I began by reading the description and thoroughly examining the Gilded Rose Requirements to comprehend the problem statement and determine the necessary tools for execution.

#### Cleaning the Repository

After forking the repository, I noticed it included the problem statement in multiple languages, which was unnecessary for our purposes. Consequently, I removed all extraneous files, retaining only the TypeScript folder.

### Adding Prettier for Improved Code Style

To enhance the code style, I integrated Prettier into the project.

### Writing Base Tests

I opted for Vitest due to my familiarity with it and its coverage feature. While the TextTest tool mentioned in the README.md is useful, I prefer sticking to what I know. The Gilded Rose Requirements recommend writing tests gradually, which I generally support. However, I wanted to establish base tests to ensure no fundamental breakages occur. These base tests are guided by the previously mentioned requirements.

### First Refactor

In this initial step, I focused on simplifying the code by reducing nested if statements and converting inverted boolean logic `(a !== b)` to standard comparisons `(a === b)`. This swap facilitated a clearer overview and easier mental modeling.

### Second Refactor

This phase revealed three key observations:

* Most first-level if statements are concerned with checking the item's name.
* Numerous conditions verify if an item is not 'Sulfuras, Hand of Ragnaros', which could be consolidated.
* Some conditions within nested if statements replicate checks from the first level.

Addressing the latter two points offered immediate benefits, so I prioritized those.

### Third Refactor

I noticed that `this.items[i].sellIn = this.items[i].sellIn - 1` was executed in every iteration unless the item was 'Sulfuras, Hand of Ragnaros', which had already been addressed. By moving this statement to the beginning of the loop, it disrupted tests for special items (Tickets and Brie Cheese) because it altered the intended sequence of operations. Adjusting the sellIn checks accordingly resolved this issue.

### Fourth Refactor

It became evident that operations were predominantly based on item name and quality. By restructuring the loop to focus on individual item names and allowing for early continuation, the code became more readable despite some repeated logic.

### Fifth Refactor

The code is looking better. Minor improvements such as using '+=' and '-=' for adjustments, inverting some conditionals, and eliminating nested if statements were made.

### Sixth Refactor

I shifted towards immutability by utilizing the map function to update the entire array of items in one go.

### Seventh Refactor

Upon reflection, immutability seemed unnecessary. It was more practical for the Item class to encapsulate its own update logic. Ideally, an update function would be passable to `new Item()`, but given the constraints, I integrated the logic directly into the class.

### Final Refactor and Check

Reviewing the test coverage, I identified two missing lines related to:
* Ensuring quality never falls below 0.
* Doubling the quality of Brie daily if sellIn is below 0.

After adding tests for these scenarios, I revisited the original code to verify if these checks were pre-existing or a result of my refactoring. The comparison (and running the new tests on the old code) confirmed that the checks were pre-existing.
