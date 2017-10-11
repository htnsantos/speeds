import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'getImage' })
export class GetImagePipe implements PipeTransform {
    constructor( private _sanitizer:DomSanitizer) {
    }
    transform(value: any): any {
        let image = "";

        switch (value) {
            case 'Bateria':
                image = '../../assets/images/ic_bateria.png';
                break;
            case 'Chaveiro':
                image = '../../assets/images/ic_chaveiro.png';
                break;
            case 'Combustivel':
                image = '../../assets/images/ic_combustive.png';
                break;
            case 'Guincho':
                image = '../../assets/images/ic_guincho.png';
                break;
            case 'Troca Pneu':
                image = '../../assets/images/ic_pneu.png';
                break;            
            default:

        }

        return image;
        
    }
}   