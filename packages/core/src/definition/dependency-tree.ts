import DependencyGroup from "@depjack/core/definition/dependency-group";
import DependencyKeys from "@depjack/core/definition/dependency-keys";

class DependencyTree<Tree extends DependencyGroup<any>> {
  constructor(
    private readonly tree: Tree
  ) {}

  // non lazy deps in correct order
  // deps for deps
  // calculate deps graph with list of deps?

  getFlatDependencies() {

  }

  getNonLazyDependencies() {

  }

  getDependency(key: DependencyKeys<Tree>) {
    const path = key.split('.');
  }
}

export default DependencyTree;
