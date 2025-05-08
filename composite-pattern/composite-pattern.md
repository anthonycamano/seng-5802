# Composite Pattern

{{INSERT DIAGRAM HERE}}

## What is the composite pattern?

The composite pattern is used to provide an implementation that allows the clients to treat an individual object (leaf) and a composition of objects (composite) the same.

The main components include (1) a common interface, (2) a leaf implementation, and (3) a composite implementation.

This pattern is great at representing tree-like structures where operations need to be performed across the entire tree.

It enables recursive composition, allowing objects to be nested to any depth while maintaining a consistent interface for client interaction.

## What kind of problem is it solving?

The composite pattern is first and foremost a structural design pattern and should be considered when your program can be modeled into a tree-like structure. For example, take the sample code in example-before.ts. We have individual classes for the different ride types, in this case an UberX and UberBlack, with their own implementations of calculateFare() and getDescription(). This works at a basic level when that is all the client needs, but we begin to see problems when calculating fares and getting descriptions requires more complexity. The fancier version (really just more complex, not really fancy, if I'm honest), FareCalculator, considers a few more factors when calculating/retrieving the fares and descriptions. It looks at whether the ride is occuring during peak hours, is an airport pickup, and if there is a special discount. This works... but what happens if more ride types are introduced? What if more factors need to be considered? This increases the complexity and we start to see a lot more if statements try to cover more situations. We must also consider special cases, shown in the sample code as a corporate package. This tries implement a fare calculation based on multiple rides. This also works... but what if we need more special cases? Is adding more special cases really the best solution?

## What is the solution?

### When to use the composite pattern

The composite pattern is useful when...

- You need to represent part-whole hierarchies of objects
- You want clients to ignore differences between individual objects and composite objects
- The structure of your objects can vary and be built dynamically
- You need to apply operation recursively over structured components

## Helpful links

https://www.youtube.com/watch?v=oo9AsGqnisk

https://refactoring.guru/design-patterns/composite
