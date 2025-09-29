import { PedidoModel } from '../../pedidos/pedido/pedidoModel';


export class Cliente {
    nome?: string;
    cnpj?: number;
    cep?: string;
    endereco?: string;
    municipio?: string;
    uf?: string;
    obs?: string;
    pedidos?: PedidoModel[];

}