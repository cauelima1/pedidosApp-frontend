import { Item } from "./itemModel";

export class PedidoModel {
    id?: number;
    idCliente?: number;
    items?: Item[] = [];
    valorTotal?: number;
    condicaoFrete?: string;
    observacoes?: string;
    statusPedido?: string;
    data?: string;
    ipi?: string;
    st?: string;
    mc?: string;
    mc1?: string;
    frete?: string;
    vdot?: string;
    stvd?: string;
    icms?: string;
}