export interface RepositoryOptions<T> {
  returning?: (keyof T)[] | '*';
}
