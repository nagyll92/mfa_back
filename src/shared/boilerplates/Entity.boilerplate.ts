export abstract class EntityBoilerplate<T, E> {

  public mapObjects(input: T, output: E): E {
    const ret = output;
    let s: string;
    for (s in input) {
      if (input.hasOwnProperty(s) && output.hasOwnProperty(s)) {
        ret[s] = input[s];
      }
    }

    return ret;
  }
}
