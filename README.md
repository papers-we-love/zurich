# Papers We ❤️ Zürich

This is the repository for the Zurich chapter of Papers We Love.

Do you want to talk about a recent paper that you are excited about? Do you
want to explain fundamental papers of your field to a wider audience?  Do you
want to (re-)discover important research works in computer science? Do you have
this really cool paper you want to tell us about?  Present the papers that you
love, tell us about how you've implement them and use them, or simply listen
and discuss!

We're curating this repository for papers presented at PWL Zürich. You can
contribute by adding PR's for papers, code, and/or links to other repositories,
like the _main_ Papers We Love repo,
[here](https://github.com/papers-we-love/papers-we-love).

We follow the Papers We Love [Code of Conduct](code-of-conduct.md).

We keep a [list of papers that we would like to talk about](paper_ideas.md).
Send us pull requests to add your own!

We also have a meetup group: https://www.meetup.com/Papers-we-love-Zurich/ for
posting events, etc.

### Upcoming meetups

#### Natallie Baikevich on Automatic Construction of Inlining Heuristics using Machine Learing

* https://www.meetup.com/Papers-we-love-Zurich/events/242544627/
* Thursday, September 14, 2017 6:30 PM
* ETH Zürich, CAB H53
* [paper](https://www.eecis.udel.edu/~skulkarn/papers/cgo-2013.pdf)

Method inlining is a very important but also dangerous compiler optimization: an
inlining decision might lead to significant speedup or performance degradation
and has to be constructed carefully. The paper compares various features and
inlining techniques, in particular neuro-evolution. We will also discuss how
having an idea about inlining traps and benefits might come useful in the
"real-world", where not everybody is a compiler developer.


### Past meetups

#### Animesh Trivedi on Raft: In Search of an Understandable Consensus Algorithm

* https://www.meetup.com/Papers-we-love-Zurich/events/240580418/
* Thursday, June 29, 2017 6:30 PM
* ETH Zürich, CAB H 52
* [slides](2017.06.29-Raft//pwl-raft-trivedi.pdf)

This time around we are going to discuss the Raft distributed consensus
algorithm from Diego Ongaro and John Ousterhout. The paper was originally
published at USENIX ATC'14 and was awarded the best paper. Since then, the
algorithm has been a part of teaching at many universities, has had many
open-sourced implementations in multiple languages, and has found its way into
production-level codes. This instantaneous acceptance into the systems building
community raises an interesting question about what makes Raft so approachable
than in comparison to others options, most notably Paxos? I will present my
impressions of the paper and what makes it an interesting read.

#### The implementation of the Cilk-5 multithreaded language.

* https://www.meetup.com/Papers-we-love-Zurich/events/238755473/
* Thursday, April 27, 2017 6:30 PM
* ETH Zürich, CAB G 52
* [slides](2017.04.27-Cilk5/pwl-cilk5.pdf)

This time we are going to talk about an older paper. Published in 1998 by Matteo
Frigo, Charles E. Leiserson, and Keith H. Randall,  The implementation of the
Cilk-5 multithreaded language
([pdf](http://supertech.csail.mit.edu/papers/cilk5.pdf))  is about expressing
parallel programs and building a run-time system that efficiently executes them.
The paper is strongly motivated by theory, but also very practical. Many of the
techniques and approaches used in the paper are (I think) still relevant today.

#### Naiad: A Timely Dataflow System

* https://www.meetup.com/Papers-we-love-Zurich/events/237963794/
* Thursday, March 23, 2017 6:30 PM
* ETH Zürich, CAB H 52
* [slides](2017.03.26-Naiad/naiad-pwl-zurich.pdf), [demo](2017.03.26-Naiad/demo)

Andrea Lattuada will (andreal@inf.ethz.ch) tell us all about Naiad: A Timely
Dataflow System by Derek G. Murray, Frank McSherry, Rebecca Isaacs, Michael
Isard, Paul Barham, and Martín Abadi.

This paper proposes a very powerful computational model for dataflow programming
designed to minimise unnecessary synchronisation. The idea is to have a system
that can be the foundation for various data-processing frameworks that can
interoperate. There is an open-source implementation in rust
(https://github.com/frankmcsherry/timely-dataflow) by one of the authors. It was
awarded a best paper award at SOSP 2013.


### Contact

- Kornilios Kourtis | [GitHub](https://github.com/kkourt) | [Twitter](https://twitter.com/kkourt)
- Vasia Kalavri     | [GitHub](https://github.com/vasia)  | [Twitter](https://twitter.com/vkalavri)
- Andrea Lattuada   | [GitHub](https://github.com/utaal)  | [Twitter](https://twitter.com/utaal)
