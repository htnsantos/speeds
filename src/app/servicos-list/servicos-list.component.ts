import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-servicos-list',
  templateUrl: './servicos-list.component.html',
  styleUrls: ['./servicos-list.component.css']
})
export class ServicosListComponent implements OnInit {

  parameters: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  empty: boolean = false;
  servicos = [];

  constructor(private db: AngularFireDatabase, private ref: ChangeDetectorRef) { 

    this.size$ = new BehaviorSubject(null);

    this.parameters = this.size$.switchMap(size =>
      db.list('/SystemParameter', ref =>
        ref.orderByChild('status')
      ).valueChanges()
    );

    this.empty = true;
    console.log(this.parameters);

    this.parameters.subscribe(servico => {
      let index = 0;
      servico.forEach(hist => {
        for (var key in hist) {
          if (hist.hasOwnProperty(key) && index == 0) {
            this.servicos.push(key);
          }
        }
        index ++;
      })
      this.empty = servico.length == 0;
      this.ref.markForCheck();
    }
    )
  }

  ngOnInit() {
  }

}
