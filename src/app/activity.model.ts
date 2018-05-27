export class ActivityModel {
  public sequence: string[];
  public activityTitle: string;
  public nextDueAt: string;
  public description: string;
  public activityInstanceID: string;
  public state: string;


  constructor(sequence: string[], activityTitle: string, nextDueAt: string, description: string, activityInstanceID: string, state: string) {
    this.sequence = sequence;
    this.activityTitle = activityTitle;
    this.nextDueAt = nextDueAt;
    this.description = description;
    this.activityInstanceID = activityInstanceID;
    this.state = state;
  }
}
