import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-motoristas-list',
  templateUrl: './motoristas-list.component.html',
  styleUrls: ['./motoristas-list.component.css']
})
export class MotoristasListComponent implements OnInit {

  motoristas: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;

  constructor(private db: AngularFireDatabase) {
    
    this.size$ = new BehaviorSubject(null);

    this.motoristas = this.size$.switchMap(size =>
      db.list('/Drivers', ref =>
        size ? ref.orderByChild('name').equalTo(size) : ref
      ).valueChanges()
    );
  }

  ngOnInit() {
  }

}
