import {getStorageValue, setStorageValue} from "src/shared";
import {PROJECTS_KEY, INIT_PROJECTS} from "src/entities/Project";
import {INIT_TASK_ID, TASK_ID_KEY} from "src/entities/Task";
import {COMMENT_ID_KEY, INIT_COMMENT_ID} from "src/entities/Comment";

export const initData = () => {
  const storageProjects = getStorageValue(PROJECTS_KEY);
  const storageTaskId = getStorageValue(TASK_ID_KEY);
  const storageCommentId = getStorageValue(COMMENT_ID_KEY);

  if (!storageProjects) setStorageValue({ value: INIT_PROJECTS, key: PROJECTS_KEY});
  if (!storageTaskId) setStorageValue({value: INIT_TASK_ID, key: TASK_ID_KEY});
  if (!storageCommentId) setStorageValue({value: INIT_COMMENT_ID, key: COMMENT_ID_KEY});
}

export const getStorageProjects = () => {
  const storageProjects = getStorageValue(PROJECTS_KEY);

  if (!storageProjects || !Array.isArray(storageProjects)) return null

  return storageProjects
}
