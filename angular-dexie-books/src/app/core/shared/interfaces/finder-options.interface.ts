export interface FinderOptions {
  type: 'books' | 'authors';
  findBy: 'id' | 'name' | 'date' | 'authorName' | 'all';
}
