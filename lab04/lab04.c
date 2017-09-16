#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
  int numero;
  int tempo;
  int prioritario;
} Processo;

struct No {
  Processo processo;
  struct No* prox;
  struct No* ant;
};

typedef struct No No;

typedef struct {
  No* cabeca;
  No* fim;
  int tamanho;
} Fila;

void inicializarFila(Fila* fila){
  No* cabeca = (No*)malloc(sizeof(No));
  cabeca->ant = cabeca;
  cabeca->prox = cabeca;
  fila->cabeca = cabeca;
  fila->fim = NULL;
  fila->tamanho = 0;
}

void enfileirar(Fila* fila, Processo processo){
  if (fila->fim == NULL)
    fila->fim = fila->cabeca;
  
  No* enfileirado = (No*)malloc(sizeof(No));
  enfileirado->processo = processo;
  enfileirado->ant = fila->fim;
  enfileirado->prox = fila->cabeca;
  fila->fim->prox = enfileirado;
  fila->fim = enfileirado;
  fila->cabeca->ant = fila->fim;

  fila->tamanho++;
}

Processo* desenfileirar(Fila* fila){
  if (fila->fim == NULL)
    return NULL;
  
  No* desenfileirado = fila->cabeca->prox;
  fila->cabeca->prox = desenfileirado->prox;
  desenfileirado->prox->ant = fila->cabeca;
  desenfileirado->prox = NULL;
  desenfileirado->ant = NULL;
  Processo p;
  Processo* processoDesenfileirado = &p;
  *processoDesenfileirado = desenfileirado->processo;

  if (fila->cabeca->ant = fila->cabeca)
    fila->fim = NULL;
  free(desenfileirado);

  fila->tamanho--;
  return processoDesenfileirado;
}

void inserirProcesso(Fila** filas, int fila, Processo processo){
  Fila* fila = &((*filas)[fila]);
  enfileirar(fila,processo);
}

Processo* removerProcesso(Filas** filas, int fila){
  Fila* fila = &((*filas)[fila]);
  return desenfileirar(fila);
}

Processo* moverProcesso(Filas** filas, int filaA, int filaB){
  Fila* filaOrigem  = &((*filas)[filaA]);
  Fila* filaDestino = &((*filas)[filaB]);
  Processo* desenfileirado = desenfileirar(filaOrigem);
  if (desenfileirado == NULL)
    return NULL;
  enfileirar(filaDestino, *desenfileirado);
  return desenfileirado;
}

void exibirProcessos(Filas** filas, int fila){
  Fila fila = (*filas)[fila];
  if (fila.tamanho == 0)
    printf("Nenhum processo existe na fila %d",fila);
  else{
    No* atual = (fila.fim)->prox->prox;
    while (atual != (fila.fim)->prox){
      Processo processo = atual->processo;
      printf("Processo %d (tempo de execucao %d) da fila %d\n",processo.numero,processo.tempo,fila);
      atual = atual->prox;
    }
  }
}

int numeroDeProcessos(Filas** filas, int fila){
  return ((*filas)[fila]).tamanho;
}

int processosFinalizados(Filas** filas, int tempo){
  Fila fila = (*filas)[2];
  if (fila.tamanho == 0)
    return 0;  
  int n = 0;
  No* atual = (fila.fim)->prox->prox;
  int somaTempo = (atual->processo).tempo;
  while (atual != (fila.fim)->prox && somaTempo <= tempo){
  	n++;
    atual = atual->prox;
    if (atual != (fila.fim)->prox)
      somaTempo += (atual->processo).tempo;
  }
  return n;
}

int main(){
  int pMax,tMax,p,t;
  p = 0;
  t = 0;
  scanf("%d %d",&pMax,&tMax);

  Fila filas[3];
  int i;
  for (i = 0; i < 3; i++)
    inicializarFila(&(filas[i]));

  int operacao;
  while (scanf("%d",&operacao) != EOF){
    switch(operacao){
      case 1:{
        if (p >= pMax)
          printf("Limite de processos excedido\n");
        else{
          int fila;
          Processo processo;
          scanf("%d %d %d %d",&fila,&processo.numero,&processo.tempo,&processo.prioritario);
          inserirProcesso(&filas,fila,processo);
          p++;
          printf("Processo %d (tempo de execucao %d) adicionado na fila %d\n",processo.numero,processo.tempo,fila);
        }
      } break;
      case 2:{
        int fila;
        scanf("%d",&fila);
        Processo* processoRemovido = removerProcesso(&filas,fila);
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

      	if (!((filaA == 1 && filaB == 0) || 
      	      (filaA == 2 && filaB == 1) || 
      	      (filaA == 2 && filaB == 0) || 
      	      (filaA == 0 && filaB == 2)) || 
      		(filaA == 2 && 
      		 filas[filaA].tamanho > 0 && 
      		 ((filas[filaA].fim)->prox->prox->processo).prioritario == 1))
      	  printf("Transacao nao permitida\n");
        else
          if (t >= tMax)
            printf("Limite de transacoes excedidas\n");
          else{
            Processo* processoMovido = moverProcesso(&filas,filaA,filaB);
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
        exibirProcessos(&filas,fila);
      } break;
      case 5:{
        int fila;
        scanf("%d",&fila);
        int n = numeroDeProcessos(&filas,fila);
        printf("Quantidade de processos na fila %d: %d\n",fila,n);
      } break;
      case 6:{
        int tempo;
        scanf("%d",&tempo);
        int n = processosFinalizados(&filas,tempo);
        printf("Quantidade de processos finalizados (em tempo, %d): %d\n",tempo,n);  
      } break;
    }
  }
}