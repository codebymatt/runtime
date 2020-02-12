# runtime
Track and visualise your runs.

**Note**: work on this project has stalled, mainly due to the fact I've stopped running outside 
as much since Ireland is cold in the winter, and exercise is far more enjoyable inside gyms
with roofs.

RunTime lets you record how far and fast you run, and then helps you track your progress using
beautiful visualisations. The word *beautiful* is key here, otherwise I'll never use it.

### Development Environment Setup
Coming soon to a README near you.

### Build/Test/Run
Also coming soon to a README near you. This one, in fact.

### Branching Strategy
Look, the README isn't finished yet, ok?

Further, more specific documentation can be found in the relevant subfolders.

### Things to note

The project currently consists of a Ruby on Rails API, a React frontend, and a PostgreSQL DB.

The primary target of the web frontend is desktop, however it's very important that it also be
mobile responsive. This will mainly be addressed in the design phase.

I love having tests that cover every use case, but I also love the idea of actually shipping code,
so I'm not looking for perfect test coverage. I do my best to use TDD where it makes sense, but also
try not to get lost in the testing weeds. 

All code will live in the same repository.

Features should be developed in short, well encapsulated bursts, and should ideally differentiate 
between technical and user features (where it makes sense).

A balance needs to be found between 'proper' code (meaning tested out its ears), and code that is
shipped (my eternal struggle).
It's my hope that working in smaller bursts will allow for this; sticking to YAGNI is
encouraged.

If I really want one, I'll build an iOS app to plug into the backend.
