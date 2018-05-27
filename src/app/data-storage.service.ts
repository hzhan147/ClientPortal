import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {catchError, map} from "rxjs/internal/operators";
import {ActivityModel} from "./activity.model";
import {Subject, throwError} from "rxjs/index";

@Injectable()
export class DataStorageService {
  post_url: string;
  get_url: string;
  submitted = new Subject<boolean>();
  loaded = new Subject<boolean>();
  activitiesReceived = new Subject<ActivityModel[]>();
  success = new Subject<boolean>();
  online = new Subject<string>();
  activityRequest: {pin:string, parentactivity: string, trial_type:string};

  constructor(private http: Http) {}
  header: Headers = new Headers({'Content-Type': 'application/json'});
  postActivity(pin:string, parentactivity: string, trial_type:string){
    this.activityRequest = {
      'pin': pin,
      'parentactivity': parentactivity,
      'trial_type': trial_type
    };

    console.log(this.activityRequest);
    return this.http.post(this.post_url, this.activityRequest, {headers: this.header})
      .subscribe(
        (response: Response) => {
          this.success.next(true);
        },
        (error: Response) => {
          console.log(error);
          this.success.next(false);
          this.submitted.next(false);
        },
        () => {
          this.submitted.next(false);
        }
      );
  }

  getServerStatus(ip: string, port: string){
    this.post_url = 'http://' + ip + ':' + port + '/dmtb_api/rest/activity/scheduleactivity';
    this.get_url = 'http://' + ip + ':' + port + '/dmtb_api/rest/activities/scheduledactivity';
    return this.http.options('http://' + ip + ':' + port + '/dmtb_api/rest/activities/scheduledactivity',{headers: this.header})
      .subscribe(
        (response: Response) => {
          if(response.status === 200) {
            this.online.next('online');
          }else if (response.status === 404){
            this.online.next('offline');
          }else {
            this.online.next('status: ' + response.status.toString());
          }
        },
        (error: Response) => {
          console.log(error);
          this.online.next('status: ' + error.status.toString());
        }
      );
  }

  getActivities(pin: number){
    console.log(this.get_url);
    return this.http.get(this.get_url + '?pin=' + pin, {headers: this.header})
      .pipe(
        map(
          (response: Response) => {
            return response.json();
          }
        ), catchError((err: Response) => {
          this.success.next(false);
          this.loaded.next(false);
          return throwError('Post activities failed: ' + err.statusText)
        })
      )
      .subscribe(
        (data: string) => {
          const activities: ActivityModel[] = data['activities'];
          this.activitiesReceived.next(activities);
          this.success.next(true);
        },
        (error: Response) => {
          this.success.next(false);
          this.submitted.next(false);
          console.log(error);
        },
        () => {
          this.loaded.next(false);
        }
      );
  }
}
