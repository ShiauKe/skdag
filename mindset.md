        ┌──────────────────────────────┐
        │        Prototype Repo         │
        │  (definitions / contracts)   │
        │  input/output spec            │
        │  handler (logic)              │
        └───────────────┬──────────────┘
                        │ initiate / clone
                        ▼
        ┌──────────────────────────────┐
       ╱        Runtime Clone           ╱│
      ╱   (instance / state)            ╱ │
     ┌──────────────────────────────┐  │ │
     │ input  { a, b, ... }          │◀─┘ │
     │ output { sum, ... }           │    │
     │ handler (shared code)         │    │
     └──────────────────────────────┘    │
                 │ edge wiring            │
                 ▼                        │
        ┌──────────────────────────────┐ │
        │            Graph              │◀┘
        │   (control panel / wiring)    │
        │   user connects & injects     │
        └──────────────────────────────┘
