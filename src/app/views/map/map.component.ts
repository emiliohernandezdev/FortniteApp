import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public mapBlank: string;
  public mapPois: string;
  public source:string;
  constructor(private service: MapService, private spinner: NgxSpinnerService) { 
    this.spinner.show("llamaloader", {
      size: "large",
      bdColor: "rgba(209,112,235,255)",
      color: "white"
    });
    this.service.getMap()
    .subscribe(r => {
      if(r.status == 200){
        this.mapBlank = r.data.images.blank;
        this.mapPois = r.data.images.pois;
        this.source = this.mapBlank;
        this.spinner.hide("llamaloader");
      }
      
    })
  }

  ngOnInit(): void {
  }

  public changeMode(){
    this.spinner.show("llamaloader", {
      size: "large",
      bdColor: "rgba(209,112,235,255)",
      color: "white"
    });
    if(this.source == this.mapBlank){
      this.source = this.mapPois;
    }else if(this.source == this.mapPois){
      this.source = this.mapBlank
    }
    setTimeout(() => {
      this.spinner.hide("llamaloader")
    }, 2500)
  }

}
