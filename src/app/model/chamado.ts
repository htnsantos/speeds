import { Veiculo } from './veiculo';
export class Chamado {
    $key: string;
    id: string;
    solicitante: string;
    data_solicitacao: any;
    local_destino: string;
    local_retirada: string;
    orcamento: any;
    picture: any;
    position_destino: any;
    position_retirada: any;
    status: string;
    type: string;
    tempo_estimado: any;
    car: any;
    placa: any;
    condicoes: Array<any>;
    veiculo: Veiculo;
}