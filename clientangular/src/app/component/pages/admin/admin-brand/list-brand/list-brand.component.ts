import { Component } from '@angular/core';
import { BrandService } from 'app/services/brandService/brand.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.scss']
})
export class ListBrandComponent {
  brandList: any[] = [];
  
  brandImagePI = environment.imgBrandAPI

  constructor(private brandService: BrandService, private toastr: ToastrService) {}

  ngOnInit(){

    this.brandService.getAllBrand().subscribe({
      next: response => {
        this.brandList = response.data
      },
      error: error => console.log(error)
    })
  }

  deleteBrand(id:any, name:any){
    if (confirm('Are you sure to delete ' + name)) {
    this.brandService.deleteBrand(id).subscribe({
      next: response => {
        this.brandList = this.brandList.filter((item) => item.id !== id);
        this.toastr.success(response.message)
      },
      error: response => this.toastr.error(response.message)
    })
  }
}
}
