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

  pedidosFiltrados7Abertos: PedidoModel[] = [];
  pedidosFiltrados7Reprovados: PedidoModel[] = [];
  pedidosFiltrados7Aprovados: PedidoModel[] = [];

  somaPedidosAbertos7Dias?: number;
  somaPedidosAbertos7DiasFormatado?: string;
  somaPedidosAprovados7Dias?: number;
  somaPedidosAprovados7DiasFormatado?: string;
  somaPedidosReprovados7Dias?: number;
  somaPedidosReprovados7DiasFormatado?: string;

  pedidosFiltradosMesAbertos: PedidoModel[] = [];
  pedidosFiltradosMesAprovados: PedidoModel[] = [];
  pedidosFiltradosMesReprovados: PedidoModel[] = [];

  somaPedidosAbertosMes?: number;
  somaPedidosAbertosMesFormatado?: string;
  somaPedidosAprovadosMes?: number;
  somaPedidosAprovadosMesFormatado?: string;
  somaPedidosReprovadosMes?: number;
  somaPedidosReprovadosMesFormatado?: string;

  pedidosFiltradosAnoAbertos: PedidoModel[] = [];
  pedidosFiltradosAnoReprovados: PedidoModel[] = [];
  pedidosFiltradosAnoAprovados: PedidoModel[] = [];

  somaPedidosAbertosAno?: number;
  somaPedidosAbertosAnoFormatado?: string;
  somaPedidosAprovadosAno?: number;
  somaPedidosAprovadosAnoFormatado?: string;
  somaPedidosReprovadosAno?: number;
  somaPedidosReprovadosAnoFormatado?: string;



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


        this.pedidosFiltrados7Abertos = pedidosRecentes.filter(p => p.statusPedido == "ABERTO");
        this.pedidosFiltrados7Reprovados = pedidosRecentes.filter(p => p.statusPedido == "ENCERRADO_REPROVADO");
        this.pedidosFiltrados7Aprovados = pedidosRecentes.filter(p => p.statusPedido == "ENCERRADO_APROVADO");

        this.somaPedidosAbertos7Dias = this.pedidosFiltrados7Abertos.reduce((total, pedido) => total + Number(pedido.valorTotal ?? 0), 0);
        this.somaPedidosAbertos7DiasFormatado = this.somaPedidosAbertos7Dias.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        this.somaPedidosAprovados7Dias = this.pedidosFiltrados7Aprovados.reduce((total, pedido) => total + Number(pedido.valorTotal ?? 0), 0);
        this.somaPedidosAprovados7DiasFormatado = this.somaPedidosAprovados7Dias.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        this.somaPedidosReprovados7Dias = this.pedidosFiltrados7Reprovados.reduce((total, pedido) => total + Number(pedido.valorTotal ?? 0), 0);
        this.somaPedidosReprovados7DiasFormatado = this.somaPedidosReprovados7Dias.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });


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


        this.pedidosFiltradosMesAbertos = pedidosRecentes.filter(p => p.statusPedido == "ABERTO");
        this.pedidosFiltradosMesReprovados = pedidosRecentes.filter(p => p.statusPedido == "ENCERRADO_REPROVADO");
        this.pedidosFiltradosMesAprovados = pedidosRecentes.filter(p => p.statusPedido == "ENCERRADO_APROVADO");

        this.somaPedidosAbertosMes = this.pedidosFiltradosMesAbertos.reduce((total, pedido) => total + Number(pedido.valorTotal ?? 0), 0);
        this.somaPedidosAbertosMesFormatado = this.somaPedidosAbertosMes.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        this.somaPedidosAprovadosMes = this.pedidosFiltradosMesAprovados.reduce((total, pedido) => total + Number(pedido.valorTotal ?? 0), 0);
        this.somaPedidosAprovadosMesFormatado = this.somaPedidosAprovadosMes.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        this.somaPedidosReprovadosMes = this.pedidosFiltradosMesReprovados.reduce((total, pedido) => total + Number(pedido.valorTotal ?? 0), 0);
        this.somaPedidosReprovadosMesFormatado = this.somaPedidosReprovadosMes.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

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


        this.pedidosFiltradosAnoAbertos = pedidosRecentes.filter(p => p.statusPedido == "ABERTO");
        this.pedidosFiltradosAnoReprovados = pedidosRecentes.filter(p => p.statusPedido == "ENCERRADO_REPROVADO");
        this.pedidosFiltradosAnoAprovados = pedidosRecentes.filter(p => p.statusPedido == "ENCERRADO_APROVADO");


                this.somaPedidosAbertosAno = this.pedidosFiltradosAnoAbertos.reduce((total, pedido) => total + Number(pedido.valorTotal ?? 0), 0);
        this.somaPedidosAbertosAnoFormatado = this.somaPedidosAbertosAno.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        this.somaPedidosAprovadosAno = this.pedidosFiltradosAnoAprovados.reduce((total, pedido) => total + Number(pedido.valorTotal ?? 0), 0);
        this.somaPedidosAprovadosAnoFormatado = this.somaPedidosAprovadosAno.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        this.somaPedidosReprovadosAno = this.pedidosFiltradosAnoReprovados.reduce((total, pedido) => total + Number(pedido.valorTotal ?? 0), 0);
        this.somaPedidosReprovadosAnoFormatado = this.somaPedidosReprovadosAno.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      }
    });

  }
}
