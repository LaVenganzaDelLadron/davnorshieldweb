import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({
    providedIn:'root'
}) 

export class LoadingService {
    private pending=signal(0); 

    readonly loading:Signal<boolean>=computed(()=>this.pending()>0);
    
    start():void{
        this.pending.update(x=>x+1);
    } 

    stop():void{
        this.pending.update(x=>Math.max(0,x-1));
    }
}
