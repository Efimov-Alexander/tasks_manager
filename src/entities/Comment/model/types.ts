export interface IComment {
  id: number,
  userName: string,
  text: string,
  createdAt: Date,
  comments?: IComment[],
  nestingLevel?: number,
}
