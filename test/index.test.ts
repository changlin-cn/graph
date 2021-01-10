import { Graph } from '../src/index';
test('getPath', () => {
  const g = new Graph([
    {
      name: 'a',
    },
    { name: 'b' },
    { name: 'c' },
    { name: 'd' },
    { name: 'f' },
  ]);
  g.addEdge('a', 'b', { distance: 1 });
  g.addEdge('a', 'c', { distance: 1 });
  g.addEdge('a', 'f', { distance: 2 });
  g.addEdge('c', 'd', { distance: 1 });
  g.addEdge('d', 'f', { distance: 1 });

  const paths = g.getPath('a', 'f');
  expect(paths).toEqual([
    { path: 'a-f', distance: 2 },
    { path: 'a-c-d-f', distance: 3 },
  ]);
});
