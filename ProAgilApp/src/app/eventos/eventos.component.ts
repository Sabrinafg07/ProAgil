import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  title = 'Eventos';

  eventosFiltrados: Evento[];
  eventos: Evento[];
  modoSalvar = 'post';
  dataEvento: string;
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletarEvento = '';
  previewImage: any;

  _filtroLista = '';

  file: File;
  fileNameToUpdate: string;

  dataAtual: string;


   constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
    ) {
      this.localeService.use('pt-br');
    }

   get filtroLista(): string {
    return this._filtroLista;
  }
   set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }

  editarEvento(evento: Evento, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = Object.assign({}, evento);
    this.evento.imagemURL = '';
    this.registerForm.patchValue(this.evento);
  }

  novoEvento(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Deletado com sucesso!');
        }, error => {
          this.toastr.error(`Erro ao deletar ${error}`);
        }
    );
  }

  openModal( template: any) {
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

    filtrarEvento(filtrarPor: string): Evento[]{
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }
    alternarimagem() {
      this.mostrarImagem = !this.mostrarImagem;
    }

    validation(){
      this.registerForm = this.fb.group({
        tema: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        local: ['', Validators.required],
        dataEvento: ['', Validators.required],
        imagemURL: ['', Validators.required],
        qtdePessoas: ['', [Validators.required, Validators.max(120000)]],
        telefone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
    }

    onFileChange(event){
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        this.file = event.target.files;
      }

    }

    uploadImagem() {
      if (this.modoSalvar === 'post') {
        const nomeArquivo = this.evento.imagemURL.split('\\', 3);
        this.evento.imagemURL = nomeArquivo[2];
  
        this.eventoService.postUpload(this.file, nomeArquivo[2])
          .subscribe(
            () => {
              this.dataAtual = new Date().getMilliseconds().toString();
              this.getEventos();
            }
          );
      } else {
        this.evento.imagemURL = this.fileNameToUpdate;
        this.eventoService.postUpload(this.file, this.fileNameToUpdate)
          .subscribe(
            () => {
              this.dataAtual = new Date().getMilliseconds().toString();
              this.getEventos();
            }
          );
      }
    }

    salvarAlteracao(template: any) {
      if (this.registerForm.valid) {
        if (this.modoSalvar === 'post') {
          this.evento = Object.assign({}, this.registerForm.value);
          this.uploadImagem();
          this.eventoService.postEvento(this.evento).subscribe(
            (novoEvento: Evento) => {
              template.hide();
              this.getEventos();
              this.toastr.success('Inserido com Sucesso!');
            }, error => {
              this.toastr.error(`Erro ao Inserir: ${error}`);
            }
          );
        } else {
          this.evento = Object.assign({ id: this.evento.id }, this.registerForm.value);

          this.uploadImagem();

          this.eventoService.putEvento(this.evento).subscribe(
            () => {
              template.hide();
              this.getEventos();
              this.toastr.success('Editado com Sucesso!');
            }, error => {
              this.toastr.error(`Erro ao Editar: ${error}`);
            }
          );
        }
      }
    }


    getEventos() {
      this.eventoService.getAllEvento().subscribe(
        (_eventos: Evento[]) => {
          this.eventos = _eventos;
          this.eventosFiltrados = this.eventos;
          console.log(this.eventos);
        }, error => {
          this.toastr.error(`Erro ao tentar Carregar eventos: ${error}`);
        });
    }
}
