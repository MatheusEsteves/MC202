#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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

void removerPaciente(ListaLigada* lista, NoLista* noAnterior, NoLista* noAtual){
  if (noAnterior == NULL)
    lista->inicio = lista->inicio->prox;
  else
    noAnterior->prox = noAtual->prox;
  free(noAtual);
  lista->tamanho--;
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

int buscarPacientePorCodigo(ListaLigada** prioridadesUrgencia, int codigo, NoLista* noAtual, NoLista* noAnterior, ListaLigada* lista){
  int prioridadeUrgencia,prioridadeIdade;
  for (prioridadeUrgencia = 0; prioridadeUrgencia < 5 && (noAtual->paciente).codigo != codigo; prioridadeUrgencia++)
    for (prioridadeIdade = 0; prioridadeIdade < 2 && (noAtual->paciente).codigo != codigo; prioridadeIdade++){
      *lista = prioridadesUrgencia[prioridadeUrgencia][prioridadeIdade];
      noAnterior = NULL;
      noAtual = (*lista)->inicio;
      while ((noAtual->paciente).codigo != codigo){
        noAnterior = noAtual;
        noAtual = noAtual->prox;
      }
      return prioridadeUrgencia;
    }
}

Paciente removerPacientePorCodigo(ListaLigada** prioridadesUrgencia, int codigo, int* prioridadeUrgencia){
  NoLista* noAtual;
  NoLista* noAnterior;
  ListaLigada* lista;
  
  *prioridadeUrgencia = buscarPacientePorCodigo(prioridadesUrgencia,codigo,noAtual,noAnterior,lista);
  removerPaciente(lista,noAnterior,noAtual);

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
  removerPacientePorCodigo(prioridadesUrgencia,pacienteChamado.codigo,&prioridadeUrgencia);

  return pacienteChamado;
}

Paciente mudarPrioridade(ListaLigada** prioridadesUrgencia, int codigo, int novaPrioridadeUrgencia){
  NoLista* noAtual;
  NoLista* noAnterior;
  ListaLigada* lista;
  int prioridadeAntiga = buscarPacientePorCodigo(prioridadesUrgencia,codigo,noAtual,noAnterior,lista);
  Paciente pacienteAlterado = noAtual->paciente;
  inserirPacienteComPrioridade(prioridadesUrgencia,pacienteAlterado,novaPrioridadeUrgencia);
  removerPaciente(lista,noAnterior,noAtual);

  return pacienteAlterado;
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

void inserirPacienteComPrioridade(ListaLigada** prioridadesUrgencia, Paciente paciente, int prioridadeUrgencia){  
  int prioridadeIdade;
  if (idade <= 3 || idade >= 65)
    prioridadeIdade = 0;
  else
    prioridadeIdade = 1;

  inserirPacienteOrdenadoDecrescente(&(prioridadesUrgencia[prioridadeUrgencia][prioridadeIdade]),paciente);
}

void imprimirNo(NoLista* noLista, int prioridadeUrgencia){
  Paciente paciente = noLista->paciente;
  printf("Paciente %d (idade %d) da lista %d\n",paciente->codigo,paciente->idade,prioridadeUrgencia);
}

void imprimirLista(ListaLigada* lista, int prioridadeUrgencia){
  NoLista* noAtual = lista->inicio;
  while (noAtual != NULL){
    imprimirNo(noAtual,prioridadeUrgencia);
    noAtual = noAtual->prox;
  }
}

void imprimirPacientesComPrioridadeIdade(ListaLigada** prioridadesUrgencia, int prioridadeUrgencia){
  ListaLigada* pacientesDaPrioridade = prioridadesUrgencia[prioridadeUrgencia];
  ListaLigada pacientesEspeciais = pacientesDaPrioridade[0];
  ListaLigada pacientesGerais = pacientesDaPrioridade[1];
  if (pacientesEspeciais.tamanho == 0 && pacientesGerais.tamanho == 0)
    printf("Nenhum paciente na categoria %d\n",prioridadeUrgencia);
  else{
    imprimirLista(&pacientesEspeciais);
    imprimirLista(&pacientesGerais);
  }
}

ListaLigada agruparPacientes(ListaLigada* pacientesDaPrioridade){
  ListaLigada pacientesEspeciais = pacientesDaPrioridade[0];
  ListaLigada pacientesGerais = pacientesDaPrioridade[1];

  if (pacientesEspeciais.tamanho == 0)
    return pacientesGerais;
  if (pacientesGerais.tamanho == 0)
    return pacientesEspeciais;
  
  ListaLigada pacientesAgrupados;
  inicializarLista(&pacientesAgrupados);
  NoLista* noAtual = pacientesEspeciais.inicio;
  while (noAtual != NULL){
    inserirPacienteOrdenadoDecrescente(&pacientesAgrupados,noAtual->paciente);
    noAtual = noAtual->prox;
  }
  noAtual = pacientesGerais.inicio;
  while (noAtual != NULL){
    inserirPacienteOrdenadoDecrescente(&pacientesAgrupados,noAtual->paciente);
    noAtual = noAtual->prox;
  }

  return pacientesAgrupados;
}

void imprimirPacientes(ListaLigada** prioridadesUrgencia, int numeroPacientes){
  int pacientesImprimidos = 0;
  int prioridadeUrgencia;
  for (prioridadeUrgencia = 0; prioridadeUrgencia < 5 && pacientesImprimidos < numeroPacientes; prioridadeUrgencia++){
    ListaLigada* pacientesDaPrioridade = prioridadesUrgencia[prioridadeUrgencia];
    ListaLigada pacientes = agruparPacientes(pacientesDaPrioridade);
    NoLista* noAtual = pacientes.inicio;
    while (noAtual != NULL && pacientesImprimidos < numeroPacientes){
      imprimirNo(noAtual,prioridadeUrgencia);
      noAtual = noAtual->prox;
      pacientesImprimidos++;
    }
  }
}

void liberarLista(ListaLigada* lista){
  free(lista->inicio);
  free(lista);
}

void liberarListas(ListaLigada** listas){
  int i;
  for (i = 0; i < 5; i++){
    liberarLista(&listas[i][0]);
    liberarLista(&listas[i][1]);
    free(listas[i]);
  }
  free(listas);
}

int main(){
  ListaLigada** prioridadesUrgencia = (ListaLigada**)malloc(5*sizeof(ListaLigada*));
  int i;
  for (i = 0; i < 5; i++){
    prioridadesUrgencia[i] = (ListaLigada*)malloc(2*sizeof(ListaLigada));
    inicializarLista(prioridadesUrgencia[i][0]);
    inicializarLista(prioridadesUrgencia[i][1]);
  }

  char* operacoes;
  while (scanf("%s",operacoes) != EOF){
    char* operacao = strtok(operacoes," ")[0];
    switch (operacao){
      case '1':{
        int codigo = atoi(strtok(NULL," "));
        int prioridade = atoi(strtok(NULL," "));
        int idade = atoi(strtok(NULL," "));
        Paciente paciente;
        paciente.codigo = codigo;
        paciente.idade = idade;
        inserirPacienteComPrioridade(prioridadesUrgencia,paciente,prioridade);
        printf("Paciente %d (idade %d) adicionado com sucesso na lista de prioridade %d!\n",codigo,idade,prioridade);
      } break;
      case '2':{
        int codigo = atoi(strtok(NULL," "));
        int* prioridadeUrgencia;
        Paciente pacienteRemovido = removerPacientePorCodigo(prioridadesUrgencia,codigo,prioridadeUrgencia); 
        printf("Paciente %d (idade %d) removido com sucesso na lista de prioridade %d!\n",
          pacienteRemovido.codigo,
          pacienteRemovido.idade,
          *prioridadeUrgencia
        );
      } break;
      case '3':{
        int prioridade = atoi(strtok(NULL," "));
        Paciente pacienteChamado = chamarPaciente(prioridadesUrgencia,prioridade);
        printf("Paciente %d (idade %d) da categoria de prioridade %d chamado para atendimento!\n",
          pacienteChamado.codigo,
          pacienteChamado.idade,
          prioridade
        );
      } break;
      case '4':{
        int codigo = atoi(strtok(NULL," "));
        int novaPrioridade = atoi(strtok(NULL," "));
        Paciente pacienteAlterado = mudarPrioridade(prioridadesUrgencia,codigo,novaPrioridade);
        printf("Paciente %d (idade %d) mudou para a categoria de prioridade %d!\n",
          pacienteAlterado.codigo,
          pacienteAlterado.idade,
          novaPrioridade
        );
      } break;
      case '5':{
        int prioridade = atoi(strtok(NULL," "));
        imprimirPacientesComPrioridadeIdade(prioridadesUrgencia,prioridade);
      } break;
      default:{
        int numeroPacientes = atoi(strtok(NULL," "));
        imprimirPacientes(prioridadesUrgencia,numeroPacientes);
      }
    } 
  }

  liberarListas(prioridadesUrgencia);

  return 0;
}