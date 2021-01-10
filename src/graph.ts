interface vertex {
  name: string;
  [index: string]: unknown;
}
interface edgeInfo {
  distance: number;
}
interface edge extends edgeInfo {
  vertex: vertex;
}
/**
 * 图
 */
export class Graph {
  /**
   *
   * @param {object[]} vertices -顶点
   * @param {string} vertice.name -顶点名
   */
  constructor(vertices: vertex[]) {
    this.vertices = vertices || [];
  }
  /**
   * 顶点
   */
  vertices: vertex[] = [];

  /**
   * 边
   */
  edges: { [index: string]: edge[] } = {};
  /**
   * 添加边
   * @param {string} vertexName1 -顶点1
   * @param {string} vertexName2 -顶点2
   * @param {Object} edgeInfo -边信息
   * @param {number} edgeInfo.distance -边距离
   */
  addEdge = (vertexName1: string, vertexName2: string, edgeInfo: edgeInfo): void => {
    const v1 = this.vertices.find((v) => v.name === vertexName1);
    const v2 = this.vertices.find((v) => v.name === vertexName2);
    if (!v1 || !v2) {
      throw new Error(`Can't find ${vertexName1} or ${vertexName2}`);
    }
    this._addEdge(v1, v2, edgeInfo);
    this._addEdge(v2, v1, edgeInfo);
  };
  /**
   * 获取点到点的位置
   * @param {string} vertexFrom -起始点
   * @param {string} vertexTo -结束点
   * @returns {Array}
   */
  getPath = (vertexFrom: string, vertexTo: string): { path: string; distance: number }[] => {
    const vf = this.vertices.find((v) => v.name === vertexFrom);
    const vt = this.vertices.find((v) => v.name === vertexTo);

    if (!vf || !vt) {
      throw new Error(`Can't find ${vertexFrom} or ${vertexTo}`);
    }
    const temp = [];
    const paths = [...this.edges[vf.name].map((n) => [n])];

    while (paths.length) {
      const currentPath = paths.shift() as edge[];
      const currentVertex = currentPath[currentPath.length - 1];

      if (currentVertex.vertex.name === vertexTo) {
        temp.push(currentPath);
        continue;
      }

      const edges = this.edges[currentVertex.vertex.name];

      for (let j = 0; j < edges.length; j++) {
        if (!currentPath.some((n) => n.vertex.name === edges[j].vertex.name) && edges[j].vertex.name !== vertexFrom) {
          paths.push(currentPath.concat(edges[j]));
        }
      }
    }
    const result = temp.map((n) => {
      let distance = 0;
      let path: string = vertexFrom;

      n.forEach((v) => {
        path += `-${v.vertex.name}`;
        distance += v.distance;
      });

      return { path, distance };
    });
    return result;
  };

  private _addEdge = (vertex1: vertex, vertex2: vertex, edgeInfo: edgeInfo): void => {
    if (!this.edges[vertex1.name]) {
      this.edges[vertex1.name] = [];
    }
    if (!this.edges[vertex1.name].some((n) => n.vertex.name === vertex2.name)) {
      this.edges[vertex1.name].push({ vertex: vertex2, ...edgeInfo });
    }
  };
}
