# Memento Pattern

{{INSERT DIAGRAM}}

## What is the memento pattern?

The memento design pattern is a behavioral pattern that allows the client to undo and redo the states of an object.

It consists of three key components: (1) the Originator, which creates and uses mementos to save its state, (2) the Memento, which stores the Originator's internal state, and (3) the Caretaker, which keeps track of the mementos but never modifies them.

### When to use the memento pattern

The memento pattern in most helpful when...

- you need to implement undo/redo functionality
- you want to create snapshots of an object's state as it changes

## What kind of problem is it solving?

There are many situations when you want to be able to undo and redo, a really common example that is used is a text editor. In example-before.ts, we look at an example of a client editing a form. It doesn't take a whole lot to view/edit the form and the private values are accessible via getters and setters in the Material class. We don't see a whole lot of issues here, but we start to see some trouble when we want to allow the client to undo their changes. Typically the trouble starts when we are trying to create the snapshots for the undo functionality. How can we create these snapshots? In many cases you may choose to iterate over all of the fields in an object and save their values into some kind of data structure. This may work, but you don't always have access to the fields, which can private access modifiers. A solution may be to simply make the fields public, but is that always an option? Not really. I was able to get around this by having two classes (Material + MaterialForm) where Material handles all of the logic for setting and getting all of the material details and also handles the undo logic so that MaterialForm doesn't need to access the private fields. This works and I don't really see an issue with this, but doing something similar may not always be possible.

## What is the solution?

## Helpful Links

https://refactoring.guru/design-patterns/memento

https://www.geeksforgeeks.org/memento-design-pattern/

https://www.youtube.com/watch?v=_Q5rXfGuyLQ
