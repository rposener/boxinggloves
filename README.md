# boxinggloves

Web Component Library using Observable Context in M-V-VM pattern

## Core Concepts

- No reliance upon other libraries - avoid issues with security, etc this way.
- KISS, use standards and make them easier whenever possible
- Stick to MVVM pattern (Model, View, View Model)

## Model

- Keep it as simple as possible, let the Model be a simple JavaScript objects and arrays
- Make it DRY, the model should be a logical model, abstracted from the view
- Support two-way updates
- Protect the model, by providing type-checked updates

## View Model

- Allow Multiple View Models, use a base indexer per View Model
- Make it Observable so that a View can Opt-In at any context layer
- Use an adapater pattern to get from the Model to the View Model, reapply this as necessary
- ViewModels are Read-Only

## View

- Stick to Web Component HTML core
- Subscribe to a single ViewModel by a base indexer in the constructor
- Support Text interpolation, click, and other bindings
- Provide the tools to the Web Component and avoid opinions (e.g. regarding shadow dom, etc.)

# Keys to Update Cycle

- Model starts with Default
- ViewModels Read the Model and Create ViewModel
- View Renders
- View Can Update the Model at the end of an Command
- All ViewModels are Re-Processed
- Views Respond Appropriately