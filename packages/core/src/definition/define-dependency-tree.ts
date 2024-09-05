import DependencyGroup from "@depjack/core/definition/dependency-group";
import DependencyTree from "@depjack/core/definition/dependency-tree";

function defineDependencyTree<Tree extends DependencyGroup<any>>(tree: Tree): DependencyTree<Tree> {
  return new DependencyTree(tree);
}

export default defineDependencyTree
