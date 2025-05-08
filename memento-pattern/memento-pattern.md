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

There are many situations when you want to be able to undo and redo, a really common example that is used is a text editor. In example-before.ts, we look at an example of a client editing a form.

## What is the solution?

## Helpful Links

https://refactoring.guru/design-patterns/memento

https://www.geeksforgeeks.org/memento-design-pattern/

https://www.youtube.com/watch?v=_Q5rXfGuyLQ
