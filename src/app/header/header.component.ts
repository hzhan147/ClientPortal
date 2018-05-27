import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs/index";
import {DataStorageService} from "../data-storage.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  statusSubscription: Subscription;
  serverStatus = 'UNKNOWN';
  disableButton = false;
  isCollapsed = false;
  @ViewChild('serverConfigForm') configForm: NgForm;
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.statusSubscription = this.dataStorageService.online.subscribe(
      (status: string) => {
        this.serverStatus = status;
        this.disableButton = false;
        console.log(status);
      }
    );
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }

  onConnect(){
    this.disableButton = true;
    this.dataStorageService.getServerStatus(this.configForm.value.ip,this.configForm.value.port);
  }

  toggleCollapse(){
    this.isCollapsed = !this.isCollapsed;
  }
}
