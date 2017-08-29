/*
  Nome: Matheus Esteves Zanoto,   RA: 184256

  Objetivos: O objetivo deste programa é realizar várias operações com lista ligada 
  (inclusão, exclusão, busca, etc) com base em um sistema de um hospital, no qual 
  há pacientes em 5 prioridades de atendimento e para cada uma das 5 prioridades
  há mais duas : pacientes especiais (com menos de 4 anos ou mais de 64 anos) e 
  pacientes gerais (idade entre 4 e 64 anos). Teremos operações para inclusão
  de um determinado paciente (com um código e uma idade) em uma determinada 
  prioridade de atendimento, remoção de um paciente pelo código, mudança de
  prioridade de atendimento de um determinado paciente e chamada de um paciente
  para atendimento, Além disso, teremos opção para imprimir todos os pacientes
  de uma determinada prioridade de atendimento, na ordem de prioridade e 
  imprimir todos os pacientes até um um número dado de pacientes informado, 
  na ordem de prioridade de atendimento, porém sem prioridade de idade.

  Entradas:
    1 int codigoPaciente int prioridadeAtendimento int idadePaciente , para inclusão de paciente
    2 int codigoPaciente , para remoção de paciente
    3 int prioridadeAtendimento , para chamar um paciente para atendimento
    4 int codigoPaciente int novaPrioridade , para mudar um paciente de prioridade de atendimento
    5 int prioridadeAtendimento, para imprimir todos os pacientes de uma prioridade, nas prioridades.
    6 int quantidadePacientes, imprimir todos os pacientes até um um número dado de pacientes informado, 
  na ordem de prioridade de atendimento, porém sem prioridade de idade.

  Saídas:
    Operação 1 : Paciente codigoPaciente (idade idadePaciente) adicionado com sucesso na lista de prioridade prioridadeAtendimento!
    Operação 2 : Paciente codigoPaciente (idade idadePaciente) removido com sucesso na lista de prioridade prioridadeAtendimento!
    Operação 3 : Paciente codigoPaciente (idade idadePaciente) da categoria de prioridade prioridadeAtendimento chamado para atendimento!
    Operação 4 : Paciente codigoPaciente (idade idadePaciente) mudou para a categoria de prioridade prioridadeAtendimento!
    Operações 5 ou 6 :
      Paciente codigoPaciente (idade idadePaciente) da lista prioridadeAtendimento
        ou 
      Nenhum paciente na categoria prioridadeAtendimento
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
  Estrutura que define um determinado paciente
*/
typedef struct{
  int codigo;
  int idade;
} Paciente;

/* Representa um nó para um determinado paciente, que aponta para o próximo paciente*/
struct NoLista{
  Paciente paciente;
  struct NoLista* prox;
};

typedef struct NoLista NoLista;

/* Representa uma lista ligada para os pacientes*/
typedef struct{
  NoLista* inicio;
  int tamanho;
} ListaLigada;

void inicializarLista(ListaLigada* lista){
  (lista)->inicio  = NULL;
  (lista)->tamanho = 0;
}

/*
  Inserimos um determinado paciente informado após um determinado nó conhecido e enviado por parâmetro,
  chamado de noAnterior, o qual apontará para um novo nó que guardará a informação do paciente inserido.
*/
void inserirPacienteNoMeio(ListaLigada** lista, NoLista** noAnterior, Paciente paciente){
  NoLista* noLista = (NoLista*)malloc(sizeof(NoLista));
  noLista->paciente = paciente;
  NoLista* aux = (NoLista*)malloc(sizeof(NoLista));
  aux = (*noAnterior)->prox;
  (*noAnterior)->prox = noLista;
  noLista->prox = aux;
  (*lista)->tamanho++;
}

/*
  Caso noAnterior seja nulo, queremos remover o primeiro elemento da lista. Logo, o início
  passará para o segundo elemento da lista. Caso contrário, fazemos o nó anterior não 
  apontar mais para o nó atual (queremos remover), mas sim para o proximo do atual.
*/
void removerPaciente(ListaLigada** lista, NoLista** noAnterior, NoLista** noAtual){
  if (*noAnterior == NULL)
    (*lista)->inicio = (*lista)->inicio->prox;
  else
    (*noAnterior)->prox = (*noAtual)->prox;
  (*lista)->tamanho--;
}

/*
  Inserimos um determinado paciente antes do nó inicial da lista, fazendo o
  novo nó que contém esse paciente apontar para o ínício da lista e atualizando
  o início da lista para esse novo nó.
*/
void inserirPacienteNoInicio(ListaLigada** lista, Paciente paciente){
  NoLista* noLista = (NoLista*)malloc(sizeof(NoLista));
  noLista->paciente = paciente;
  noLista->prox = (*lista)->inicio;
  (*lista)->inicio = noLista;
  (*lista)->tamanho++;
}

/*
  Buscamos um determinado paciente com base na sua idade, em uma lista ordenada de forma decrescente.
  Dessa forma, basta acharmos um elemento da lista tal que a idade do paciente nesse elemento seja menor 
  que a idade do paciente procurado. Acharemos dessa maneira a posição de busca, atualizando os ponteiros
  noAtual (paciente procurado) e noAnterior (anterior ao paciente procurado).
*/
void buscarPacienteOrdenadoDecrescente(ListaLigada** lista, Paciente paciente, NoLista** noAnterior, NoLista** noAtual){
  *noAnterior = NULL;
  *noAtual = (*lista)->inicio;
  while (*noAtual != NULL && ((*noAtual)->paciente).idade >= paciente.idade){
    *noAnterior = *noAtual;
    *noAtual = (*noAtual)->prox;
  }
}

/*
  Buscamos um determinado paciente na lista de prioridades, com base em um determinado código. Para isso, percorremos
  todas as 5 prioridades, bem como cada uma das 2 prioridades relacionadas à idade, para cada uma das 5 prioridades
  de atendimento. Em cada iteração, verificamos se o paciente encontrado é igual ao paciente procurado, até achá-lo.
  Quando achamos, atualizamos o ponteiro que representa a lista ligada no qual esse paciente está inserido e os ponteiros
  noAtual (aponta para o nó do paciente procurado) e noAnterior (aponta para o nó anterior do paciente procurado).
*/
int buscarPacientePorCodigo(ListaLigada** prioridadesUrgencia, int codigo, NoLista** noAtual, NoLista** noAnterior, ListaLigada** lista){
  int prioridadeUrgencia,prioridadeIdade;
  for (prioridadeUrgencia = 0; prioridadeUrgencia < 5; prioridadeUrgencia++)
    for (prioridadeIdade = 0; prioridadeIdade < 2; prioridadeIdade++){
      *lista = &prioridadesUrgencia[prioridadeUrgencia][prioridadeIdade];
      *noAnterior = NULL;
      *noAtual = (*lista)->inicio;
  
      while (*noAtual != NULL && ((*noAtual)->paciente).codigo != codigo){
        *noAnterior = *noAtual;
        *noAtual = (*noAtual)->prox;
      }

      if (*noAtual != NULL)
        return prioridadeUrgencia;
    }
  return -1;
}

/*
  Removemos da lista de prioridade um determinado paciente, conforme um determinado código informado.
  Para isso, buscamos a posição que esse paciente está na lista (atualizando os ponteiros noAnterior
  e noAtual) e removemos esse paciente com base nessa posição. Também atualizamos a prioridade desse
  paciente removido, bem como recuperamos sua idade.
*/
Paciente removerPacientePorCodigo(ListaLigada*** prioridadesUrgencia, int codigo, int* prioridadeUrgencia){
  NoLista* noAtual = (NoLista*)malloc(sizeof(NoLista));
  NoLista* noAnterior = (NoLista*)malloc(sizeof(NoLista));
  ListaLigada* lista = (ListaLigada*)malloc(sizeof(ListaLigada));
  
  *prioridadeUrgencia = buscarPacientePorCodigo(*prioridadesUrgencia,codigo,&noAtual,&noAnterior,&lista);
  removerPaciente(&lista,&noAnterior,&noAtual);

  Paciente pacienteRemovido = noAtual->paciente;
  free(noAtual);

  return pacienteRemovido;
}

/*
  Chamamos o próximo paciente que será atendido em uma determinada prioridade de atendimento
  informada, com base na fila de prioridade para idade. Ao chamarmos um determinado paciente,
  ele é removido dessa lista.
*/
Paciente chamarPaciente(ListaLigada*** prioridadesUrgencia, int prioridadeUrgencia){
  Paciente pacienteChamado;
  if ((*prioridadesUrgencia)[prioridadeUrgencia][0].tamanho > 0)
    pacienteChamado = (*prioridadesUrgencia)[prioridadeUrgencia][0].inicio->paciente;
  else
  	pacienteChamado = (*prioridadesUrgencia)[prioridadeUrgencia][1].inicio->paciente;

  ListaLigada** aux = *prioridadesUrgencia;
  removerPacientePorCodigo(&aux,pacienteChamado.codigo,&prioridadeUrgencia);

  return pacienteChamado;
}

/*
  Inserimos um determinado paciente numa determinada lista. Caso a lista esteja vazia,
  inserimos no início da lisya. Caso contrário, buscamos a posição para inserir
  de forma ordenada decrescente (atualizando noAnterior e noAtual) e inserimos no
  inicio a posição de inserção seja antes do início da lista ou no meio caso seja
  depois do ínício da lista.
*/
void inserirPacienteOrdenadoDecrescente(ListaLigada* lista, Paciente paciente){
  if ((lista)->tamanho == 0)
    inserirPacienteNoInicio(&lista,paciente);
  else{
    NoLista* noAnterior = (NoLista*)malloc(sizeof(NoLista));
    NoLista* noAtual = (NoLista*)malloc(sizeof(NoLista));
    buscarPacienteOrdenadoDecrescente(&lista,paciente,&noAnterior,&noAtual);
    if (noAnterior == NULL)
      inserirPacienteNoInicio(&lista,paciente);
    else
      inserirPacienteNoMeio(&lista,&noAnterior,paciente);
  }
}

/*
  Inserimos um determinado paciente em uma determinada prioridade de atendimento, na lista dessa prioridade,
  com base na sua idade.
*/
void inserirPacienteComPrioridade(ListaLigada*** prioridadesUrgencia, Paciente paciente, int prioridadeUrgencia){  
  int prioridadeIdade;
  int idade = paciente.idade;
  if (idade <= 3 || idade >= 65)
    prioridadeIdade = 0;
  else
    prioridadeIdade = 1; 

  inserirPacienteOrdenadoDecrescente(&((*prioridadesUrgencia)[prioridadeUrgencia][prioridadeIdade]),paciente);
}

/*
  Mudamos a prioridade de atendimento de um determinado paciente cujo código é informado, removendo esse
  paciente da lista da prioridade antiga e inserindo ele na lista da nova prioridade.
*/
Paciente mudarPrioridade(ListaLigada*** prioridadesUrgencia, int codigo, int novaPrioridadeUrgencia){
  NoLista* noAtual = (NoLista*)malloc(sizeof(NoLista));
  NoLista* noAnterior = (NoLista*)malloc(sizeof(NoLista));
  ListaLigada* lista = (ListaLigada*)malloc(sizeof(ListaLigada));
  buscarPacientePorCodigo(*prioridadesUrgencia,codigo,&noAtual,&noAnterior,&lista);
  Paciente pacienteAlterado = noAtual->paciente;
  ListaLigada** aux = *prioridadesUrgencia;
  inserirPacienteComPrioridade(&aux,pacienteAlterado,novaPrioridadeUrgencia);
  removerPaciente(&lista,&noAnterior,&noAtual);

  return pacienteAlterado;
}

/*
  Imprimimos o conteúdo de um paciente em um determinado nó da lista.
*/
void imprimirNo(NoLista* noLista, int prioridadeUrgencia){
  Paciente paciente = noLista->paciente;
  printf("Paciente %d (idade %d) da lista %d\n",paciente.codigo,paciente.idade,prioridadeUrgencia);
}

/*
  Imprimimos todos os pacientes em cada um dos nós da lista referente a prioridade informada.
*/
void imprimirLista(ListaLigada* lista, int prioridadeUrgencia){
  NoLista* noAtual = (NoLista*)malloc(sizeof(NoLista));
  noAtual = lista->inicio;
  while (noAtual != NULL){
    imprimirNo(noAtual,prioridadeUrgencia);
    noAtual = noAtual->prox;
  }
}

/*
  Imprimimos todos os pacientes de uma determinada prioridade de atendimento, seguindo os critérios de
  prioridade para idade.
*/
void imprimirPacientesComPrioridadeIdade(ListaLigada** prioridadesUrgencia, int prioridadeUrgencia){
  ListaLigada pacientesEspeciais = prioridadesUrgencia[prioridadeUrgencia][0];
  ListaLigada pacientesGerais = prioridadesUrgencia[prioridadeUrgencia][1];
  if (pacientesEspeciais.tamanho == 0 && pacientesGerais.tamanho == 0)
    printf("Nenhum paciente na categoria %d\n",prioridadeUrgencia);
  else{
    imprimirLista(&pacientesEspeciais,prioridadeUrgencia);
    imprimirLista(&pacientesGerais,prioridadeUrgencia);
  }
}

/*
  Juntamos os pacientes gerais com os especiais em uma única lista 
  e ordenamos ela de forma decrescente.
*/
ListaLigada agruparPacientes(ListaLigada* pacientesDaPrioridade){
  ListaLigada pacientesEspeciais = pacientesDaPrioridade[0];
  ListaLigada pacientesGerais = pacientesDaPrioridade[1];

  if (pacientesEspeciais.tamanho == 0)
    return pacientesGerais;
  if (pacientesGerais.tamanho == 0)
    return pacientesEspeciais;
  
  ListaLigada pacientesAgrupados;
  inicializarLista(&pacientesAgrupados);
  NoLista* noAtual = (NoLista*)malloc(sizeof(NoLista));
  noAtual = pacientesEspeciais.inicio;
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

/*
  imprimimos todos os pacientes até um um número dado de pacientes informado, 
  na ordem de prioridade de atendimento, porém sem restrição de idade.
*/
void imprimirPacientes(ListaLigada** prioridadesUrgencia, int numeroPacientes){
  int pacientesImprimidos = 0;
  int prioridadeUrgencia;
  ListaLigada* pacientesDaPrioridade = (ListaLigada*)malloc(2*sizeof(ListaLigada));
  NoLista* noAtual = (NoLista*)malloc(sizeof(NoLista));
  for (prioridadeUrgencia = 0; prioridadeUrgencia < 5 && pacientesImprimidos < numeroPacientes; prioridadeUrgencia++){
    pacientesDaPrioridade = prioridadesUrgencia[prioridadeUrgencia];
    ListaLigada pacientes = agruparPacientes(pacientesDaPrioridade);
    if (pacientes.tamanho > 0){
      noAtual = pacientes.inicio;
      while (noAtual != NULL && pacientesImprimidos < numeroPacientes){
        imprimirNo(noAtual,prioridadeUrgencia);
        noAtual = noAtual->prox;
        pacientesImprimidos++;
      }
    }
  }
}

int main(){
  ListaLigada** prioridadesUrgencia = (ListaLigada**)malloc(5*sizeof(ListaLigada*));
  int i;
  for (i = 0; i < 5; i++){
    prioridadesUrgencia[i] = (ListaLigada*)malloc(2*sizeof(ListaLigada));
    inicializarLista(&prioridadesUrgencia[i][0]);
    inicializarLista(&prioridadesUrgencia[i][1]);
  }

  int operacao;
  while (scanf("%d",&operacao) != EOF){
    switch (operacao){
      case 1:{
        int codigo, prioridade, idade;
        scanf("%d %d %d",&codigo,&prioridade,&idade);
        Paciente paciente;
        paciente.codigo = codigo;
        paciente.idade = idade;
        inserirPacienteComPrioridade(&prioridadesUrgencia,paciente,prioridade);
        printf("Paciente %d (idade %d) adicionado com sucesso na lista de prioridade %d!\n",codigo,idade,prioridade);
      } break;
      case 2:{
        int codigo;
        scanf("%d",&codigo);
        int prioridadeUrgencia;
        Paciente pacienteRemovido = removerPacientePorCodigo(&prioridadesUrgencia,codigo,&prioridadeUrgencia); 
        printf("Paciente %d (idade %d) removido com sucesso na lista de prioridade %d!\n",
          pacienteRemovido.codigo,
          pacienteRemovido.idade,
          prioridadeUrgencia
        );
      } break;
      case 3:{
        int prioridade;
        scanf("%d",&prioridade);
        Paciente pacienteChamado = chamarPaciente(&prioridadesUrgencia,prioridade);
        printf("Paciente %d (idade %d) da categoria de prioridade %d chamado para atendimento!\n",
          pacienteChamado.codigo,
          pacienteChamado.idade,
          prioridade
        );
      } break;
      case 4:{
        int codigo, novaPrioridade;
        scanf("%d %d",&codigo,&novaPrioridade);
        Paciente pacienteAlterado = mudarPrioridade(&prioridadesUrgencia,codigo,novaPrioridade);
        printf("Paciente %d (idade %d) mudou para a categoria de prioridade %d!\n",
          pacienteAlterado.codigo,
          pacienteAlterado.idade,
          novaPrioridade
        );
      } break;
      case 5:{
        int prioridade;
        scanf("%d",&prioridade);
        imprimirPacientesComPrioridadeIdade(prioridadesUrgencia,prioridade);
      } break;
      default:{
        int numeroPacientes;
        scanf("%d",&numeroPacientes);
        imprimirPacientes(prioridadesUrgencia,numeroPacientes);
      }
    } 
  }

  for (i = 0; i < 5; i++){
    free(prioridadesUrgencia[i][0].inicio);
    free(prioridadesUrgencia[i][1].inicio);
    free(prioridadesUrgencia[i]);
  }
  free(prioridadesUrgencia);

  return 0;
}