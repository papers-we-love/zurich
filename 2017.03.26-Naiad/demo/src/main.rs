extern crate time;
extern crate timely;
extern crate itertools;

use std::collections::HashMap;

use timely::dataflow::*;
use timely::dataflow::operators::*;
use timely::dataflow::channels::pact::Exchange;

use itertools::Itertools;

fn main() {

    ::timely::execute_from_args(std::env::args(), move |root| {

        let index = root.index();

        let start = time::precise_time_s();

        let mut edges = vec![
            ('a', 'b'),
            ('a', 'c'),
            ('c', 'b'),
            ('b', 'd'),
            ('b', 'e'),
        ];

        let edges_map: HashMap<char, Vec<(char, char)>> = edges.drain(..)
            .group_by(|&(src, _)| src).into_iter()
            .map(|(src, group)| (src, group.collect::<Vec<_>>()))
            .collect();

        if index == 0 {
            println!("{:?}", edges_map);
        }

        let roots = vec!['a'];

        root.scoped::<u64, _, _>(|scope| {
            let root_input_stream: Stream<_, char> = if index == 0 {
                roots.to_stream(scope)
            } else {
                vec![].to_stream(scope)
            };
            let output_stream = scope.scoped::<u64, _, _>(|inner| {
                let (loop_handle, root_feedback_stream): (_, Stream<_, char>) = inner.loop_variable(std::u64::MAX, 1);
                let root_input_stream = root_input_stream.enter(inner);
                let root_forward_stream = root_feedback_stream.concat(&root_input_stream);
                let edge_stream: Stream<_, (char, char)> = root_forward_stream.unary_stream(
                    Exchange::new(|src| *src as u64),
                    "Lookup",
                    move |input, output| {
                        input.for_each(|cap, data| {
                            for src in data.drain(..) {
                                if let Some(values) = edges_map.get(&src) {
                                    output.session(&cap).give_iterator(values.iter().cloned());
                                }
                            }
                        });
                    });
                edge_stream
                    .map(|(_, dst)| dst)
                    .inspect_batch(move |ts, x| println!("loop:   [{:?}] {:?} -> {:?}", index, ts, x))
                    .connect_loop(loop_handle);
                edge_stream.leave()
            });
            output_stream.inspect_batch(move |ts, x| println!("output: [{:?}] {:?} -> {:?}", index, ts, x));
        });
    }).unwrap();

}

