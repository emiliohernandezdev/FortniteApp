import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-daily-shop',
  templateUrl: './daily-shop.component.html',
  styleUrls: ['./daily-shop.component.scss']
})
export class DailyShopComponent implements OnInit{
  constructor(private service: ShopService, private spinner: NgxSpinnerService) { 
    this.renderProcess();
  }
  public hasData:boolean = false;
  public featured: Object;
  public daily: Object;
  public specialFeatured: Object;
  public specialDaily: Object;

  public hours:any;
  public minutes:any;
  public seconds:any;

  public renderProcess(){
    this.spinner.show("llamaloader", {
      size: "large",
      bdColor: "rgba(209,112,235,255)",
      color: "white"
    });
    this.service.getDailyShop()
    .subscribe((res) => {
      if(res.status == 200){
        this.hasData = true
        for(var a in res.data){
          if(a == "featured"){
            this.featured = res.data.featured;
          }else if(a == "daily"){
            this.daily = res.data.daily;
          }else if(a == "specialFeatured"){
            this.specialFeatured = res.data.specialFeatured;
          }else if(a == "specialDaily"){
            this.specialDaily = res.data.specialDaily;
          }
        }

        this.spinner.hide('llamaloader')
      }
    })
  }

  ngOnInit(): void {
    setInterval(() => {
      var date_future:any = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 18);
      var date_now:any = new Date();
  
      var seconds = Math.floor((date_future - (date_now))/1000);
      var minutes = Math.floor(seconds/60);
      var hours = Math.floor(minutes/60);
      var days = Math.floor(hours/24);
      
      var hours = hours-(days*24);
      var minutes = minutes-(days*24*60)-(hours*60);
      var seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      if(hours ==0 && minutes == 0 && seconds == 0){
        location.reload();
      }
    }, 1000)
  }




  
}
