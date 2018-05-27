import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/index";
import {DataStorageService} from "../data-storage.service";
import {ActivityModel} from "../activity.model";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit, OnDestroy {
  defaultActivity = 'Daily_Survey';
  defaultType = 'DIABETESTB';
  formSubmitted = false;
  loadSubmitted = false;
  successSubmission = null;
  connected = false;
  activities: ActivityModel[];
  submitSubscription: Subscription;
  receivedSubscription: Subscription;
  loadedSubscription: Subscription;
  successSubscription: Subscription;
  statusSubscription: Subscription;
  @ViewChild('form') form: NgForm;
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.submitSubscription = this.dataStorageService.submitted.subscribe(
      (status: boolean) => {
        this.formSubmitted = status;
      }
    );
    this.receivedSubscription = this.dataStorageService.activitiesReceived.subscribe(
      (activities: ActivityModel[]) => {
        this.activities = activities;
      }
    );
    this.loadedSubscription = this.dataStorageService.loaded.subscribe(
      (status: boolean) => {
        this.loadSubmitted = status;
      }
    );
    this.successSubscription = this.dataStorageService.success.subscribe(
      (status: boolean) => {
        this.successSubmission = status;
      }
    );
    this.form.valueChanges.subscribe(
      () => {
        this.successSubmission = null;
      }
    );
    this.statusSubscription = this.dataStorageService.online.subscribe(
      (status: string) => {
        if(status === 'online'){
          this.connected = true;
        }else{
          this.connected = false;
        }
      }
    );
  }

  submit(){
    this.dataStorageService.submitted.next(true);
    this.dataStorageService.postActivity(this.form.value.pin,this.form.value.activity,this.form.value.type);
  }

  ngOnDestroy(): void {
    this.submitSubscription.unsubscribe();
    this.receivedSubscription.unsubscribe();
    this.loadedSubscription.unsubscribe();
    this.successSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  getAllActivities(){
    this.dataStorageService.loaded.next(true);
    this.dataStorageService.getActivities(this.form.value.pin);
  }
}
