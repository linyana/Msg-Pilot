export abstract class BaseTaskService {
  abstract SendMessage(params: { info: any }): Promise<void>;
}
