import { Nota } from '../entities/Nota';

export interface INotaRepository {
  createNota(data: { nameCliente: string; modelo: string; defeito: string; valor: string; clienteId: number }): void;
  findAllNotas(): Promise<Nota[]>;
  findNotaById(id: number): Promise<Nota | null>;
  updateNota(id: number, data: Partial<{ nameCliente: string; modelo: string; defeito: string; valor: string; clienteId: number }>): void;
  deleteNota(id: number): Promise<void>;
}
