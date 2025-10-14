import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../pedidos/pedido-service';
import { PedidoModel } from '../../pedidos/pedido/pedidoModel';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  pedidos: PedidoModel[] = [];
  pedidosFiltrados7: PedidoModel[] = [];
  pedidosFiltradosMes: PedidoModel[] = [];
  pedidosFiltradosAno: PedidoModel[] = [];

  constructor(private service: PedidoService) { }

  ngOnInit(): void {
    this.filtrar7Dias();
    this.filtrar30Dias();
    this.filtrar360Dias();
  }

  filtrar7Dias() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // zera hora para evitar conflitos

    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);
    seteDiasAtras.setHours(0, 0, 0, 0);

    this.service.mostrarPedidos().subscribe({
      next: (pedidos: PedidoModel[]) => {
        this.pedidos = pedidos;

        const pedidosRecentes = pedidos.filter(p => {
          if (!p.data) return false;

          const dataConvertida = new Date(p.data);
          dataConvertida.setHours(0, 0, 0, 0); // zera hora para comparar só a data

          return dataConvertida >= seteDiasAtras && dataConvertida <= hoje;
        });

        console.log('Pedidos dos últimos 7 dias:', pedidosRecentes.length);
        // Se quiser exibir em tela:
        this.pedidosFiltrados7 = pedidosRecentes;
      }
    });
  }

  filtrar30Dias() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // zera hora para evitar conflitos

    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);
    trintaDiasAtras.setHours(0, 0, 0, 0);

    this.service.mostrarPedidos().subscribe({
      next: (pedidos: PedidoModel[]) => {
        this.pedidos = pedidos;

        const pedidosRecentes = pedidos.filter(p => {
          if (!p.data) return false;

          const dataConvertida = new Date(p.data);
          dataConvertida.setHours(0, 0, 0, 0); // zera hora para comparar só a data

          return dataConvertida >= trintaDiasAtras && dataConvertida <= hoje;
        });

        console.log('Pedidos dos últimos 30 dias:', pedidosRecentes.length);
        // Se quiser exibir em tela:
        this.pedidosFiltradosMes = pedidosRecentes;
      }
    });

  }

  filtrar360Dias() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // zera hora para evitar conflitos

    const anoAtras = new Date();
    anoAtras.setDate(hoje.getDate() - 360);
    anoAtras.setHours(0, 0, 0, 0);

    this.service.mostrarPedidos().subscribe({
      next: (pedidos: PedidoModel[]) => {
        this.pedidos = pedidos;

        const pedidosRecentes = pedidos.filter(p => {
          if (!p.data) return false;

          const dataConvertida = new Date(p.data);
          dataConvertida.setHours(0, 0, 0, 0); // zera hora para comparar só a data

          return dataConvertida >= anoAtras && dataConvertida <= hoje;
        });

        console.log('Pedidos do último ano:', pedidosRecentes.length);
        // Se quiser exibir em tela:
        this.pedidosFiltradosAno = pedidosRecentes;
      }
    });

  }
}
