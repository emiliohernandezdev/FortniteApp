import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-daily-shop',
  templateUrl: './daily-shop.component.html',
  styleUrls: ['./daily-shop.component.scss']
})
export class DailyShopComponent implements OnInit {
  constructor(private service: ShopService) { 
    this.renderProcess();
  }
  public hasData:boolean = false;
  public featured: Object;
  public daily: Object;
  public specialFeatured: Object;
  public specialDaily: Object;

  public renderProcess(){
    this.service.getDailyShop()
    .subscribe((res) => {
      if(res.status == 200){
        console.log(res)
        this.hasData = true
        for(var a in res.data){
          if(a == "featured"){
            console.log("se encontró featured")
            this.featured = res.data.featured;
            console.log(this.featured)
          }else if(a == "daily"){
            console.log("se encontró daily")
            this.daily = res.data.daily;
          }else if(a == "specialFeatured"){
            console.log("se encontró specialFeatured")
            this.specialFeatured = res.data.specialFeatured;
          }else if(a == "specialDaily"){
            console.log("se encontró specialDaily")
            this.specialDaily = res.data.specialDaily;
          }
        }
      }
    })

    this.service.getCombinedShop()
    .subscribe((r) => {
      console.log(r);
      
    })
  }

  ngOnInit(): void {
  }

  
}
