# runtime
Track and visualise your runs.

RunTime lets you record how far and fast you run, and then helps you track your progress using
beautiful visualisations. The word *beautiful* is key here, otherwise I'll never use it.

### Development Environment Setup
Coming soon to a README near you

### Build/Test/Run
Also coming soon to a README near you. This one, in fact.

Further, more specific documentation can be found in the relevant subfolders.

### Things to note

The project currently conists of a Go API, a React frontend, and a Postgres DB.

The primary target of the web frontend is desktop, however it's very important that it also be
mobile responsive. This will mainly be addressed in the design phase.

Full, complete testing is paramount as continuous integration and deployment is a
reasonably early target. **TEST ALL THE THINGS. UNIT, INTEGRATION, ACCEPTANCE, YOU NAME IT.
USE TDD WHERE IT MAKES SENSE. ALL CAPS COS THIS IS VERY IMPORTANT.**

All code will live in the same repository.

Features should be developed in short, well encapsulated bursts, and should ideally differentiate 
between technical and user features (where it makes sense).

A balance needs to be found between beautifully architected, elegant code, and code that is
shipped (my eternal struggle. Not that I write elegant code. Or ship things for that matter).
It's my hope that working in smaller bursts will allow for this; sticking to YAGNI is
encouraged.

If I really want one, I'll build an iOS app to plug into the backend. If my Android using friends
really want one, I'll consider build an Android App for them if they ask nicely. Or my parents. They
deserve all the nice things.
