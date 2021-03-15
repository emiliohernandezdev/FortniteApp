import { Component, OnInit } from '@angular/core';
import { CosmeticService } from 'src/app/services/cosmetic.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-cosmetics',
  templateUrl: './cosmetics.component.html',
  styleUrls: ['./cosmetics.component.scss']
})
export class CosmeticsComponent implements OnInit {
  public cosmetics:Object;
  constructor(private service: CosmeticService, private spinner: NgxSpinnerService) {
    this.spinner.show("llamaloader", {
      size: "large",
      bdColor: "rgba(209,112,235,255)",
      color: "white"
    });
    this.service.getNewCosmetics()
    .subscribe((r) => {
      if(r.status == 200){
        this.cosmetics = r.data
        this.spinner.hide('llamaloader')
      }
    })
   }

  ngOnInit(): void {
  }

}
