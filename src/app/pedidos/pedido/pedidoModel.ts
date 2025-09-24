import { Item } from "./itemModel";

export class PedidoModel {
    id?: number;
    idCliente?: number;
    items?: Item[] = [];
    valorTotal?: number;
    validade?: string;
    condicaoFrete?: string;
    observacoes?: string;
    statusPedido?: string;
    data?: string;
    IPI?: number;
    ST?: number;
    mc?: number;
    mc1?: number;
    frete?: number;
    vdot?: number;
    stvd?: number;
}