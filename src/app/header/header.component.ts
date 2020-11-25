import {Component, Output, EventEmitter} from '@angular/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    @Output() recipesSelected = new EventEmitter();
    @Output() shoppingSelected = new EventEmitter();

    selectRecipes(e){
        this.recipesSelected.emit()
    }

    selectShopping(e){
        this.shoppingSelected.emit()
    }
}