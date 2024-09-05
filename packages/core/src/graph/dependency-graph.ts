import DependencyGroup from "@depjack/core/definition/dependency-group";

class DependencyGraph<Tree extends DependencyGroup<any>> {
  constructor(
    private readonly tree: Tree,
  ) {}
}
