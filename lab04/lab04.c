/*
  Nome: Matheus Esteves Zanoto  RA: 184256

  Objetivos: O objetivo deste programa é organizar uma fila de processos de um determinado 
  sistema operacional, com base em algumas operações que envolvem esses processos como
  liberação, bloqueio, execução, dentre outros. Além disso, também temos as operações para 
  impressão desses processos. Utilizaremos filas para representar cada fila de processos
  do sistema operacional : processos bloqueados, processos em execução e processos finalizados.

  Entradas: Recebemos como entrada as possíveis operações a serem realizadas com as filas de processos,
  bem como os parâmetros necessários para a realização de cada uma dessas operações:
    - operação 1 (adicionar processo): número da fila, número do processo, tempo de execução do processo, prioridade do processo.
    - operação 2 (remover processo): número da fila
    - operação 3 (mover processo de fila): número da fila de origem e número da fila de destino.
    - operação 4 (exibir processos): número da fila
    - operação 5 (número de processos): número de fila
    - operaçao 6 (tempo de execução): tempo necessário para executar os processos.

  Saídas: 
    - Operação 1: Processo id (tempo de execução temp_exec) adicionado na fila #fila ou Limite de processos excedido.
    - Operação 2: Processo %d removido da fila %d
    - Operação 3: Transacao nao permitida, 
                  Limite de transacoes excedidas, 
                  Nenhum processo existe na fila %d,
                  Processo %d movido da fila %d para a %d
    - Operação 4: Processo %d (tempo de execucao %d) da fila %d ou Nenhum processo existe na fila %d
    - Operação 5: Quantidade de processos na fila %d: %d
    - Operação 6: Quantidade de processos finalizados (em tempo, %d): %d
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
  Registro que representa um processo na lista de processos.
*/
typedef struct {
  int numero;
  int tempo;
  int prioritario;
} Processo;

/*
  Estrutura que representa um nó, dentre um conjunto de nós
*/
struct No {
  Processo processo;
  struct No* prox;
  struct No* ant;
};

typedef struct No No;

/*
  Estrutura que representa uma lista ligada circular com cabeça.
*/
typedef struct {
  No* cabeca;
  No* fim;
  int tamanho;
} Fila;

/*
  Inicializa uma fila com o nó cabeça e um ponteiro anterior e próximo que aponta
  para o próprio nó cabeça.
*/
void inicializarFila(Fila* fila){
  No* cabeca = (No*)malloc(sizeof(No));
  cabeca->ant = cabeca;
  cabeca->prox = cabeca;
  fila->cabeca = cabeca;
  fila->fim = NULL;
  fila->tamanho = 0;
}

/*
  Retiramos o primeiro processo da fila e devolvemos um ponteiro para ele.
*/
Processo* desenfileirar(Fila* fila){
  /*
    Se a fila estiver vazia, não retiramos nada.
  */
  if (fila->fim == NULL)
    return NULL;
  
  No* desenfileirado = fila->cabeca->prox;
  /*
    Se a fila não estiver vazia, removemos o nó referente ao primeiro elmento da fila,
    após o nó cabeça, atualizando os ponteiros para anterior e próximo dos nós relacionados
    com essa remoção.
  */
  fila->cabeca->prox = desenfileirado->prox;
  desenfileirado->prox->ant = fila->cabeca;
  desenfileirado->prox = NULL;
  desenfileirado->ant = NULL;
  Processo p;
  Processo* processoDesenfileirado = &p;
  *processoDesenfileirado = desenfileirado->processo;

  if (fila->cabeca->ant == fila->cabeca)
    fila->fim = NULL;
  free(desenfileirado);

  fila->tamanho--;
  return processoDesenfileirado;
}

/*
  Libera uma determinada fila baseada numa lista circular com cabeça, liberando todos
  os nós contidos nessa estrutura.
*/
void liberarFila(Fila* fila){
  while (fila->tamanho > 0)
    desenfileirar(&(*fila));
  free(fila->cabeca);
}

/*
  Insere um determinado processo no final da fila.
*/
void enfileirar(Fila* fila, Processo processo){
  /*
    Se a fila estiver vazia, inserimos o processo no início da fila, que será igual ao fim.
  */
  if (fila->fim == NULL)
    fila->fim = fila->cabeca;
  
  No* enfileirado = (No*)malloc(sizeof(No));
  enfileirado->processo = processo;
  /*
    Caso a fila não esteja vazia, colocamos o novo processo após o ponteiro para o fim
    da lista, atualizando os ponteiros anterior e próximo do fim da fila e do novo 
    nó inserido. Atualizamos o novo fim da fila.
  */
  enfileirado->ant = fila->fim;
  enfileirado->prox = fila->cabeca;
  fila->fim->prox = enfileirado;
  fila->fim = enfileirado;
  fila->cabeca->ant = fila->fim;

  fila->tamanho++;
}

/*
  Enfileiramos um determinado processo numa determinada fila.
*/
void inserirProcesso(Fila* fila, Processo processo){
  enfileirar(&(*fila),processo);
}

/*
  Desenfileiramos um determinado processo de uma determinada fila.
*/
Processo* removerProcesso(Fila* fila){
  return desenfileirar(&(*fila));
}

/*
  Desenfileiramos um processo de uma filaA e enfileiramos esse
  mesmo processo desenfileirado na filaB. Isso significa que
  movemos um determinado processo de fila. Retornamos um 
  ponteiro para esse processo movido.
*/
Processo* moverProcesso(Fila* filaA, Fila* filaB){
  Processo* desenfileirado = desenfileirar(&(*filaA));
  if (desenfileirado == NULL)
    return NULL;
  Processo p1;
  p1.numero = desenfileirado->numero;
  p1.tempo = desenfileirado->tempo;
  p1.prioritario = desenfileirado->prioritario;
  enfileirar(&(*filaB), p1);
  Processo p2;
  Processo* ponteiroProcesso = &p2;
  *ponteiroProcesso = p1;

  return ponteiroProcesso;
}

/*
  Exibimos todos os processos existentes em uma determinada fila cujo número foi passado
  como parâmetro.
*/
void exibirProcessos(Fila fila, int n){
  if (fila.tamanho == 0)
    printf("Nenhum processo existe na fila %d\n",n);
  else{ 
    No* atual = (fila.fim)->prox->prox;
    while (atual != (fila.fim)->prox){
      Processo processo = atual->processo;
      printf("Processo %d (tempo de execucao %d) da fila %d\n",processo.numero,processo.tempo,n);
      atual = atual->prox;
    }
  }
}

/*
  Retornamos o número de processos existentes em uma determinada fila passada como parãmetro.
*/
int numeroDeProcessos(Fila fila){
  return fila.tamanho;
}

/*
  Retornamos o número de processos que foram finalizados em um determinado tempo passado como parâmetro,
  considerando os processos na fila de executando. A cada finalização, devemos remover o processo finalizado
  da fila de executando.
*/
int processosFinalizados(Fila** filas, int tempo){
  Fila* fila = &((*filas)[2]);
  if (fila->tamanho == 0)
    return 0;  

  int n = 0;
  No* atual = fila->fim->prox->prox;
  int somaTempo = tempo - (atual->processo).tempo;
  while (atual != NULL && atual != fila->fim->prox && somaTempo >= 0){
  	n++;
    desenfileirar(&(*fila));
    if (fila->fim == NULL)
      atual = NULL;
    else{
      atual = fila->fim->prox->prox;
      somaTempo -= (atual->processo).tempo;
    }
  }
  return n;
}

int main(){
  int pMax,tMax,p,t;
  p = 0;
  t = 0;
  scanf("%d %d",&pMax,&tMax);

  Fila* filas = (Fila*)malloc(3*sizeof(Fila));
  int i;
  for (i = 0; i < 3; i++){
    inicializarFila(&(filas[i]));
  }

  int operacao;
  while (scanf("%d",&operacao) != EOF){
    switch(operacao){
      case 1: {
        int fila;
        Processo processo;
        scanf("%d %d %d %d",&fila,&(processo.numero),&(processo.tempo),&(processo.prioritario));
        if (p >= pMax) 
          printf("Limite de processos excedido\n");
        else{
          inserirProcesso(&(filas[fila]),processo);
          p++;
          printf("Processo %d (tempo de execucao %d) adicionado na fila %d\n",processo.numero,processo.tempo,fila);
        } 
      } break;
      case 2:{
        int fila;
        scanf("%d",&fila);
        Processo* processoRemovido = removerProcesso(&(filas[fila]));
        if (processoRemovido == NULL)
          printf("Nenhum processo existe na fila %d\n",fila);
        else{
          p--;
          printf("Processo %d removido da fila %d\n",processoRemovido->numero,fila);
        }
      } break;
      case 3:{
      	int filaA,filaB;
      	scanf("%d %d",&filaA,&filaB);

      	if (((filaA == 0 && filaB == 1) ||
             (filaA == 1 && filaB == 2)) || 
      		(filaA == 2 && filaB == 1 &&
      		 filas[filaA].tamanho > 0 && 
      		 ((filas[filaA].fim)->prox->prox->processo).prioritario == 1))
      	  printf("Transacao nao permitida\n");
        else
          if (t >= tMax)
            printf("Limite de transacoes excedidas\n");
          else{
            Processo* processoMovido = moverProcesso(&(filas[filaA]),&(filas[filaB]));
            if (processoMovido == NULL)
              printf("Nenhum processo existe na fila %d\n",filaA);
            else{
              t++;
              printf("Processo %d movido da fila %d para a %d\n",processoMovido->numero,filaA,filaB); 
            }
          }
      } break;
      case 4:{
        int fila;
        scanf("%d",&fila);
        exibirProcessos(filas[fila],fila);
      } break;
      case 5:{
        int fila;
        scanf("%d",&fila);
        int n = numeroDeProcessos(filas[fila]);
        printf("Quantidade de processos na fila %d: %d\n",fila,n);
      } break;
      default:{
        int tempo;
        scanf("%d",&tempo);
        int n = processosFinalizados(&filas,tempo);
        printf("Quantidade de processos finalizados (em tempo, %d): %d\n",tempo,n);  
      }
    }
  }
  for (i = 0; i < 3; i ++)
    liberarFila(&(filas[i]));
  free(filas);
}