export abstract class BaseTaskService {
  abstract handleTask(params: { task_id: number; account_id: number }): Promise<void>;
}
