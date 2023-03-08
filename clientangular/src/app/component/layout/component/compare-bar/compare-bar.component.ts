import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CompareService } from 'app/services/productService/compare.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-compare-bar',
  templateUrl: './compare-bar.component.html',
  styleUrls: ['./compare-bar.component.scss']
})
export class CompareBarComponent {
  @Input() toggleCompare = true
  @Output() isToggleChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  compareList: any[] = []
  imgProductAPI = environment.imgProductAPI

  constructor(private compareService: CompareService){
    this.compareList = compareService.request
  }

  toggleCompareButton(){
    this.toggleCompare = !this.toggleCompare
    this.isToggleChange.emit(this.toggleCompare)
  }



  removeItemCompare(id:any){
    this.compareService.removeCompareProductItem(id)
  }

  removeAllItemCompare(){
    this.compareService.deleteAllCompareRequest()
  }
}
