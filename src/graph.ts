interface vertice {
  name: string;
}
interface edgeInfo {
  distance: number;
}
interface edge extends edgeInfo {
  vertice: vertice;
}
/**
 * 图
 */
export class graph {
  /**
   *
   * @param {object[]} vertices -顶点
   * @param {string} vertice.name -顶点名
   */
  constructor(vertices: vertice[]) {
    this.vertices = vertices || [];
  }
  private vertices: vertice[];
  private edges: { [index: string]: edge[] } = {};
  /**
   * 添加边
   * @param {string} verticeName1 -顶点1
   * @param {string} verticeName2 -顶点2
   * @param {Object} edgeInfo -边信息
   * @param {number} edgeInfo.distance -边距离
   */
  addEdge = (verticeName1: string, verticeName2: string, edgeInfo: edgeInfo): void => {
    const v1 = this.vertices.find((v) => v.name === verticeName1);
    const v2 = this.vertices.find((v) => v.name === verticeName2);
    if (!v1 || !v2) {
      throw new Error(`Can't find ${verticeName1} or ${verticeName2}`);
    }
    this._addEdge(v1, v2, edgeInfo);
    this._addEdge(v2, v1, edgeInfo);
  };
  private _addEdge = (vertice1: vertice, vertice2: vertice, edgeInfo: edgeInfo): void => {
    if (!this.edges[vertice1.name]) {
      this.edges[vertice1.name] = [];
    }
    if (!this.edges[vertice1.name].some((n) => n.vertice.name === vertice2.name)) {
      this.edges[vertice1.name].push({ vertice: vertice2, ...edgeInfo });
    }
  };
}
