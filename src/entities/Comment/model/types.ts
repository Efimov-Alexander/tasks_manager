export interface IComment {
  id: number,
  userName: string,
  text: string,
  createdAt: Date,
  comments?: IComment[],
}

export interface INestedComment extends IComment {
  nestingLevel: number,
  visible: boolean,
}
