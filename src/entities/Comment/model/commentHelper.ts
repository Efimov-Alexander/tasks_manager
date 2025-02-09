import {IComment, INestedComment} from "./types";

const traverseComments = (comments: IComment[], collectedComments: INestedComment[], nestingLevel: number, visible: boolean) => {
  comments.forEach((comment) => {
    collectedComments.push({ ...comment, nestingLevel, visible });

    if (comment.comments) {
      const newNestingLevel = nestingLevel + 1;

      traverseComments(comment.comments, collectedComments, newNestingLevel, false);
    }
  })
}

export const collectNestedComments = (comments: IComment[] | undefined) => {
  if (!comments) return [];

  const collectedComments = [] as INestedComment[];
  const nestingLevel = 0;

  traverseComments(comments, collectedComments, nestingLevel, true);

  return collectedComments;
}

export const removeNestedComments = (comments: IComment[], comment: IComment) => {
  const nestedComments = comment.comments ? collectNestedComments(comment.comments) : [];

  return comments.filter((someComment) => {
    return !nestedComments.some((comment) => (comment.id === someComment.id))
  })
}

export const isVisibleNestedComments = (nestedComments: IComment[] | undefined, visibleComments: IComment[]) => {
  return nestedComments ?
    nestedComments.every((nestedComment) => {
      return visibleComments.some((visibleComment) => visibleComment.id === nestedComment.id)
    })
    : false
}
