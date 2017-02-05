### Paper suggestions and ideas

If you are interested in talking about paper, please let us know by modifying
this page and doing a pull request.


#### The implementation of the Cilk-5 multithreaded language.

This is one my favourite papers
([pdf](http://supertech.csail.mit.edu/papers/cilk5.pdf)), and I think it's not
very well known.  It talks about expressing parallel progarms and buidling a
run-time system that efficiently executes them, and combines a strong
theoretical background with practical concerns. It won the [2008 Most
Influential PLDI Paper
Award](http://www.sigplan.org/Awards/PLDI/#2008_Matteo_Frigo__Charles_E._Leiserson__and_Keith_H._Randall).
 Contact: Kornilios Kourtis (kkourt@kkourt.io).
 
#### Naiad: A Timely Dataflow System

This [paper](http://sigops.org/sosp/sosp13/papers/p439-murray.pdf) proposes a very powerful computational model for dataflow programming designed to minimise unnecessary synchronisation. The idea is to have a system that can be the foundation for various data-processing frameworks that can interoperate. There is an open-source implementation in rust (https://github.com/frankmcsherry/timely-dataflow) by one of the authors. It was awarded a best paper award at SOSP 2013.
Contact: Andrea Lattuada (andreal@inf.ethz.ch) 
