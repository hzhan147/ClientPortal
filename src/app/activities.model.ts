export class ActivitiesModel {
  public activities: ActivitiesModel[];
  public enhancedContent: string;
  public message: string;

  constructor(activities: ActivitiesModel[], enhancedContent: string, message: string) {
    this.activities = activities;
    this.enhancedContent = enhancedContent;
    this.message = message;
  }
}
