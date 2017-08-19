#include <stdio.h>
#include <stdlib.h>

typedef struct{
  int codigo,
  int idade
} Paciente;

typedef struct{
  Paciente paciente,
  NoLista* prox
} NoLista;

typedef struct{
  NoLista* inicio,
  int tamanho
} ListaLigada;

void inicializarLista(ListaLigada* lista){
  lista->inicio  = NULL;
  lista->tamanho = 0;
}

void inserirPacienteNoMeio(ListaLigada* lista, NoLista* noAnterior, Paciente paciente){
  NoLista* noLista  = (NoLista*)malloc(sizeof(NoLista));
  noLista->paciente = paciente;
  NoLista* aux = noAnterior->prox;
  noAnterior->prox = noLista;
  noLista->prox = aux;
  lista->tamanho++;
}

void inserirPacienteNoInicio(ListaLigada* lista, Paciente paciente){
  NoLista* noLista = (NoLista*)malloc(sizeof(NoLista));
  noLista->prox = lista->inicio;
  lista->inicio = noLista;
  lista->tamanho++;
}

void buscarPacienteOrdenadoDecrescente(ListaLigada* lista, Paciente paciente, NoLista* noAnterior, NoLista* noAtual){
  noAnterior = NULL;
  noAtual = lista->inicio;
  while ((noAtual->paciente).idade >= paciente.idade){
    noAnterior = noAtual;
    noAtual = noAtual->prox;
  }
}

void buscarPacientePorCodigo(ListaLigada** prioridadesUrgencia, int codigo, NoLista* noAtual, NoLista* noAnterior, ListaLigada* lista){
  int prioridadeUrgencia,prioridadeIdade;
  for (prioridadeUrgencia = 0; prioridadeUrgencia < 5; prioridadeUrgencia++)
    for (prioridadeIdade = 0; prioridadeIdade < 2; prioridadeIdade++){
      *lista = prioridadesUrgencia[prioridadeUrgencia][prioridadeIdade];
      noAnterior = NULL;
      noAtual = (*lista)->inicio;
      while ((noAtual->paciente).codigo != codigo){
        noAnterior = noAtual;
        noAtual = noAtual->prox;
      }
    }
}

Paciente removerPacientePorCodigo(ListaLigada** prioridadesUrgencia, int codigo){
  NoLista* noAtual;
  NoLista* noAnterior;
  ListaLigada* lista;
  buscarPacientePorCodigo(prioridadesUrgencia,codigo,noAtual,noAnterior,lista);
  if (noAnterior == NULL)
    lista->inicio = lista->inicio->prox;
  else
    noAnterior->prox = noAtual->prox;

  Paciente pacienteRemovido = noAtual->paciente;
  free(noAtual);
  lista->tamanho--;

  return pacienteRemovido;
}

Paciente chamarPaciente(ListaLigada** prioridadesUrgencia, int prioridadeUrgencia){
  ListaLigada* pacientesDaPrioridade = prioridadesUrgencia[prioridadeUrgencia];
  Paciente pacienteChamado;
  if (pacientesDaPrioridade[0]->tamanho > 0)
    pacienteChamado = pacientesDaPrioridade[0]->inicio->paciente;
  else
  	pacienteChamado = pacientesDaPrioridade[1]->inicio->paciente;
  removerPacientePorCodigo(pacienteChamado.codigo);

  return pacienteChamado;
}

void inserirPacienteOrdenadoDecrescente(ListaLigada* lista, Paciente paciente){
  if (lista->tamanho == 0)
    inserirPacienteNoInicio(lista,paciente);
  else{
    NoLista* noAnterior;
    NoLista* noAtual;
    buscarPacienteOrdenadoDecrescente(lista,paciente,noAnterior,noAtual);
    inserirPacienteNoMeio(lista,noAnterior,paciente);
  }
}

void inserirPacienteComPrioridade(ListaLigada** prioridadesUrgencia, int codigo, int idade, int prioridadeUrgencia){
  Paciente paciente;
  paciente.codigo = codigo;
  paciente.idade = idade;
  
  int prioridadeIdade;
  if (idade <= 3 || idade >= 65)
    prioridadeIdade = 0;
  else
    prioridadeIdade = 1;

  inserirPacienteOrdenadoDecrescente(&(prioridadesUrgencia[prioridadeUrgencia][prioridadeIdade]));
}


int main(){
  ListaLigada** prioridadesUrgencia = (ListaLigada**)malloc(5*sizeof(ListaLigada*));
  int i;
  for (i = 0; i < 5; i++)
    prioridadesUrgencia[i] = (ListaLigada*)malloc(2*sizeof(ListaLigada));

  

  return 0;
}