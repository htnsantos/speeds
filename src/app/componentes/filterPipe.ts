import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], id, data): any {

        if (data) {
            var arr = data.split("-");
            data = [arr[2], arr[1], arr[0]].join("/");
        }

        var retorno = id ? items.filter(item => item.id.indexOf(id) !== -1) : items;

        retorno = data ? retorno.filter(item => item.data_solicitacao.indexOf(data) !== -1) : retorno;


        return retorno;
    }
}

