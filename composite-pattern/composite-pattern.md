# Composite Pattern

[uml diagram for the composite pattern]{../images/composte-pattern.png}

## What is the composite pattern?

The composite pattern is used to provide an implementation that allows the clients to treat an individual object (leaf) and a composition of objects (composite) the same.

The main components include (1) a common interface, (2) a leaf(s) implementation, and (3) a composite implementation.

This pattern is great at representing tree-like structures where operations need to be performed across the entire tree.

It enables recursive composition, allowing objects to be nested to any depth while maintaining a consistent interface for client interaction.

### When to use the composite pattern

The composite pattern is useful when...

- You need to represent part-whole hierarchies of objects
- You want clients to ignore differences between individual objects and composite objects
- The structure of your objects can vary and be built dynamically
- You need to apply operation recursively over structured components

## What kind of problem is it solving?

The composite pattern is first and foremost a structural design pattern and should be considered when your program can be modeled into a tree-like structure. For example, take the sample code in example-before.ts. We have individual classes for the different ride types, in this case an UberX and UberBlack, with their own implementations of calculateFare() and getDescription(). This works at a basic level when that is all the client needs, but we begin to see problems when calculating fares and getting descriptions requires more complexity. The fancier version (really just more complex, not really fancy, if I'm honest), FareCalculator, considers a few more factors when calculating/retrieving the fares and descriptions. It looks at whether the ride is occuring during peak hours, is an airport pickup, and if there is a special discount. This works... but what happens if more ride types are introduced? What if more factors need to be considered? This increases the complexity and we start to see a lot more if statements try to cover more situations. We must also consider special cases, shown in the sample code as a corporate package. This tries implement a fare calculation based on multiple rides. This also works... but what if we need more special cases? Is adding more special cases really the best solution?

## What is the solution?

A better solution would be to implement the composite design pattern. Before we get their, it might be helpful to mention a few signs that may point to a possible implementation of the pattern. They could be:

- Parameter explosion -> we saw this with the FareCalculator gaining more parameters as more factors were added
- Special cases -> we saw this with the implementation of the CorporatePackageCalculator
- Repeated operations -> repeated operations of calculateFare() and getDescription(), this may point to needed a shared interface
- Possible tree-like structure -> we saw this start to take shape with the corporate package and being made up of multiple individual rides

The implementation of the composite pattern can be seen in example-after.ts. The first thing to notice is the inclusion of the shared interface, RideComponent, for all of the ride components. Next are the implementations of two leaf components, SingleRide and RideSurcharge, which stemmed from the components that affected the fare in both the FareCalculator and the CorporatePackageCalculator. Finally, we have the composite component, CompositeRide, that is meant to be made up of the leaf components. In mainWithComposite() we see how everything is simplified. We are still able to create individual rides using SingleRide and any additional objects that can affect the fare or description can be instantiated with RideSurcharge. Also, we are still able to get the fares/descriptions of the single rides we create, but we're also able to get that information from the composite rides, thanks to the shared interface.

## Helpful links

https://refactoring.guru/design-patterns/composite

https://www.youtube.com/watch?v=oo9AsGqnisk
