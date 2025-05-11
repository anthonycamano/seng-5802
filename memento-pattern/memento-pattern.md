# Memento Pattern

{{INSERT DIAGRAM}}

## What is the memento pattern?

The memento design pattern is a behavioral pattern that allows the client to undo and redo the states of an object.

It consists of three key components: (1) the Originator, which creates and uses mementos to save its state, (2) the Memento, which stores the Originator's internal state, and (3) the Caretaker, which keeps track of the mementos but never modifies them.

### When to use the memento pattern

The memento pattern in most helpful when...

- you need to implement undo/redo functionality
- you want to create snapshots of an object's state as it changes
- you want to maintin encapsulation when preserving state history

## Background

## What kind of problem is it solving?

There are many situations when you want to be able to undo and redo, a really common example that is used is a text editor. In example-before.ts, we look at an example of a client editing a form. It doesn't take a whole lot to view/edit the form and the private values are accessible via getters and setters in the Material class. We don't see a whole lot of issues here, but we start to see some trouble when we want to allow the client to undo their changes. Typically the trouble starts when we are trying to create the snapshots for the undo functionality. How can we create these snapshots? In many cases you may choose to iterate over all of the fields in an object and save their values into some kind of data structure. This may work, but you don't always have access to the fields, which can be set to private. A solution may be to simply make the fields public, but is that always an option? Not really. I was able to get around this by having two classes (Material + MaterialForm) where Material handles all of the logic for setting and getting all of the material details and also handles the undo logic so that MaterialForm doesn't need to access the private fields. This works... but we run into a few issues, specifically we are still exposing our private fields with our history array being made up of an object using public fields, the Material class now has more responsibilities and the history implementation is now tightly coupled to the Material class as well.

## Output -- Before

```

```

## What is the solution?

A better solution would be to implement the memento design pattern.

We can see the implementation of this in example-after.ts. We start with the creating MaterialMemento class that takes the role of the memento in the pattern. The main responsibilty of this class is to store the state of the Material. We also have a Material class, that takes up the role of the originator in the pattern, whose role is to do a lot of the base functionality of a material (get + set data) while also saving and restoring mementos. Then we also have MementoHistory class that acts as the caretaker. The main responsibility of this class is to handle the logic for managing the history of the mementos (undo, redo, adding to history, + checks). And similar to the original implementation, we have a MaterialForm class that is what the client interacts with and has all the functionality abstracted away into the other classes.

This approach offers the following advantages:

- Better separation of concerns
- Enhanced encapsulation (the Memento's state is only accessible to the Originator)
- More flexible implementation of undo/redo operations
- Cleaner, more maintainable code

## Output -- Before

```

```

## Helpful Links

https://refactoring.guru/design-patterns/memento

https://www.geeksforgeeks.org/memento-design-pattern/

https://www.youtube.com/watch?v=_Q5rXfGuyLQ
