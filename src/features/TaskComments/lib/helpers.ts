import type {IComment} from "src/entities/Comment";

const traverseComments = (comments: IComment[], collectedComments: IComment[], nestingLevel: number) => {
  comments.forEach((comment) => {
    collectedComments.push({ ...comment, nestingLevel });

    if (comment.comments) {
      const newNestingLevel = nestingLevel + 1;

      traverseComments(comment.comments, collectedComments, newNestingLevel);
    }
  })
}

export const removeNestedComments = (comments: IComment[], comment: IComment) => {
  const nestedComments = comment.comments ? collectNestedComments(comment.comments) : [];

  return comments.filter((someComment) => {
    return !nestedComments.some((comment) => (comment.id === someComment.id))
  })
}

export const collectNestedComments = (comments?: IComment[]) => {
  if (!comments) return [];

  const collectedComments = [] as IComment[];
  const nestingLevel = 0;

  traverseComments(comments, collectedComments, nestingLevel);

  return collectedComments;
}

export const isVisibleNestedComments = ({ visibleComments, nestedComments }: { visibleComments: IComment[], nestedComments: IComment['comments']}) => {
  return nestedComments ?
    nestedComments.every((nestedComment) => {
      return visibleComments.some((visibleComment) => visibleComment.id === nestedComment.id)
    })
    : false
}

export const addNestedComment = (comments: IComment[], commentId: IComment['id'], newComment: IComment) => {
  comments.forEach((someComment) => {
    if (someComment.id === commentId) someComment.comments = someComment.comments ? [...someComment.comments, newComment] : [newComment]
    if (someComment.comments) addNestedComment(someComment.comments, commentId, newComment);
  })
}

