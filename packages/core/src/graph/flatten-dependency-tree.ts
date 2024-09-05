import Dependency from "@depjack/core/definition/dependency";
import DependencyGroup from "@depjack/core/definition/dependency-group";

type FlattenDependencyTree = Record<string, Dependency<any, any>>;

function flattenDependencyTree(tree: DependencyGroup<any>, flatDeps: FlattenDependencyTree = {}, parentPath = []): FlattenDependencyTree {
  for (const key in tree) {
    const targetDependencyOrGroup = tree[key];

    // TODO: instanceof?
    if(targetDependencyOrGroup) {}
  }
}

export default flattenDependencyTree;
