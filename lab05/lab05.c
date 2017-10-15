/*
  Nome: Matheus Esteves Zanoto   RA: 184256

  Objetivos: Gerenciar a execução de operações de uma estante com o apoio de um compartimento auxiliar. A
  estante deve efetuar operações específicas, dentre as quais três são as mais importantes: inserir uma
  nova remessa de livros em uma determinada prateleira, remover um determinado livro numa determinada 
  localização e reorganizar uma prateleira inteira dada uma nova configuração.

  Entradas: Receberá como entrada o número da operação correspondente seguido dos parâmetros necessários, 
  que podem ser nomes de livros a serem inseridos numa determinada prateleira informada ou uma determinada
  localização na estante (coluna, prateleira ou uma determinada altura na pilha de livros) para as demais
  operações.

  Saída: Terá como saída mensagens que informam o sucesso ou não em relação à realização da operação desejada,
  informando os dados relativos à operação (informações acerca do livro sobre o qual a operação foi realizada ou 
  uma determinada localização), relatório de todos os livros da estante ou o relatório do montante relacionado 
  aos livros da estante.
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
  Estrutura para armazenar um determinado livro na pilha de livros.
*/
typedef struct{
  char* nome;
} Livro;

/*
  Estrutura que representa uma pilha de vários livros, cujo tamanho máximo
  permitido é armazenado. Há um vetor que armazena um ponteiro para um 
  determinado livro em cada posição.
*/
typedef struct{
  Livro** livros;
  int tamanho;
  int limite;
} Pilha;

void inicializarPilha(Pilha* pilha, int limite);
void liberarPilha(Pilha* pilha);
void empilhar(Pilha* pilha, Livro livro);
Livro* desempilhar(Pilha* pilha);

typedef struct{
  float preco;
  Pilha* pilhas;
  int qtdLivros;
  int colunas;
  int limite;
} Prateleira;

void inicializarPrateleira(Prateleira* prateleira, int colunas, int limite);
void adicionarLivros(Prateleira* prateleiras, Pilha* aux, int prat);
void imprimirLivros(Prateleira* prateleiras, int prat, Pilha* aux);
void mudarPrecos(Prateleira* prateleiras, int prat_origem, int col_origem, int prat_destino, int col_destino, Pilha* aux);
void calcularMontante(Prateleira* prateleiras, int qtdPrateleiras);
void reorganizarPrateleira(Prateleira* prateleiras, int prat, int* configuracao, Pilha* aux);
Livro* removerLivro(Prateleira* prateleiras, int p, int c, int l, Pilha* aux);

int main(){
  int p,c,l;
  scanf("%d %d %d\n",&p,&c,&l);
  
  /*
    Inicializamos uma estante, com base num vetor de prateleiras, cujo tamanho
    é informado como entrada do programa.
  */
  Prateleira* prateleiras = (Prateleira*)malloc(p*sizeof(Prateleira));
  int i;
  for (i = 0; i < p-1; i++){
    scanf("%f ",&(prateleiras[i].preco));
    inicializarPrateleira(&(prateleiras[i]),c,l);
  }
  scanf("%f\n",&(prateleiras[i].preco));
  inicializarPrateleira(&(prateleiras[i]),c,l);

  /*
    Compartimento auxiliar para livros, por meio do qual realizamos várias
    operações relacionadas aos livros no programa.
  */
  Pilha aux;
  inicializarPilha(&aux,2*l);

  int operacao;
  while (scanf("%d",&operacao) != EOF){
    switch (operacao){
      case 1:{
        int prat,qtd;
        scanf("%d %d ",&prat,&qtd);
        liberarPilha(&aux);
        for (i = 0; i < qtd-1; i++){
          Livro livro;
          livro.nome = (char*)malloc(30*sizeof(char));
          scanf("%s ",livro.nome);
          empilhar(&aux,livro);
        }
        Livro livro;
        livro.nome = (char*)malloc(30*sizeof(char));
        scanf("%s",livro.nome);
        empilhar(&aux,livro);

        if (aux.tamanho > (c*l - prateleiras[prat].qtdLivros)){
          printf("Espaco insuficiente na prateleira de custo $%.0f. Favor remover os livros do compartimento auxiliar.\n",
          	      prateleiras[prat].preco);
          liberarPilha(&aux);
        }
        else{
          adicionarLivros(&(*prateleiras),&aux,prat);
          printf("Foram inseridos com sucesso %d livros na prateleira de custo $%.0f\n",qtd,prateleiras[prat].preco);
        }
      } break;
      case 2:{
        int prat,coluna,altura;
        scanf("%d %d %d",&prat,&coluna,&altura);
        liberarPilha(&aux);
        Livro* livroRemovido = removerLivro(&(*prateleiras),prat,coluna,altura,&aux);
        if (livroRemovido == NULL)
          printf("Nao existe nenhum livro na posicao desejada\n");
        else
          printf("Livro %s removido com sucesso da coluna %d da prateleira de custo $%.0f\n",
            livroRemovido->nome,coluna,prateleiras[prat].preco
          );
      } break;
      case 3:{
        int prat_origem,col_origem,prat_destino,col_destino;
        scanf("%d %d %d %d",&prat_origem,&col_origem,&prat_destino,&col_destino);
        Prateleira pratOrigem = prateleiras[prat_origem];
        Prateleira pratDestino = prateleiras[prat_destino];
        Pilha origem = pratOrigem.pilhas[col_origem];
        Pilha destino = pratDestino.pilhas[col_destino];
        if (origem.tamanho > destino.limite - destino.tamanho)
          printf("Espaco insuficiente na prateleira %d e coluna %d\n",prat_destino,col_destino);
        else{
          liberarPilha(&aux);
          mudarPrecos(&(*prateleiras),prat_origem,col_origem,prat_destino,col_destino,&aux);
          printf("A mudança de livros : [%d, $%.0f] ==> [%d, $%.0f] foi feita com sucesso\n",
            col_origem,pratOrigem.preco,col_destino,pratDestino.preco
          );
        }
      } break;
      case 4:{
        int prat,i;
        int* configuracao;
        scanf("%d",&prat);
        configuracao = (int*)malloc(c*sizeof(int));
        for (i = 0; i < c; i++)
          scanf("%d",&(configuracao[i]));
        liberarPilha(&aux);
        reorganizarPrateleira(&(*prateleiras),prat,&(*configuracao),&aux);
        printf("A reorganização da prateleira %d foi feita com sucesso\n",prat);
      } break;
      case 5:{
        calcularMontante(&(*prateleiras),p);
      } break;
      default:{
        int prat;
        scanf("%d",&prat);
        liberarPilha(&aux);
        imprimirLivros(&(*prateleiras),prat,&aux);
      }
    }
  }

  return 0;
}

/*
  Alocamos um vetor de ponteiro de livros na pilha informada,
  cujo tamanho máximo permitido também é informado. Inicialmente,
  em cada posição desse vetor, o ponteiro que aponta para um
  determinado livro é nulo, ou seja, não há livro naquela posição.
*/
void inicializarPilha(Pilha* pilha, int limite){
  pilha->tamanho = 0;
  pilha->limite  = limite;
  pilha->livros  = (Livro**)malloc(limite*sizeof(Livro*));
  int i;
  for (i = 0; i < limite; i++)
    pilha->livros[i] = NULL;
}

void liberarPilha(Pilha* pilha){
  while (pilha->tamanho > 0)
    desempilhar(&(*pilha));
}

/*
  Criamos um ponteiro para um determinado livro passado como parâmetro
  no final do nosso vetor de livros, ou seja, empilhamos um ponteiro 
  para um determinado livro na pilha.
*/
void empilhar(Pilha* pilha, Livro livro){
  pilha->livros[pilha->tamanho] = (Livro*)malloc(sizeof(Livro));
  pilha->livros[pilha->tamanho]->nome = (char*)malloc(30*sizeof(char));
  strcpy(pilha->livros[pilha->tamanho]->nome,livro.nome);
  pilha->tamanho++;
}

/*
  Desalocamos o ponteiro para o último livro no nosso vetor de livros,
  ou seja, desempilhamos um ponteiro de livro da nossa pilha. Retornamos
  um ponteiro para o livro desempilhado.
*/
Livro* desempilhar(Pilha* pilha){
  if (pilha->tamanho > 0){
    Livro* livroDesempilhado = (Livro*)malloc(sizeof(Livro));
    Livro* ponteiroLivro = pilha->livros[pilha->tamanho-1];
    livroDesempilhado->nome = (char*)malloc(30*sizeof(char));
    strcpy(livroDesempilhado->nome,ponteiroLivro->nome);
    free(pilha->livros[pilha->tamanho-1]);
    pilha->livros[pilha->tamanho-1] = NULL;
    pilha->tamanho--;
    return &(*livroDesempilhado);
  }
  return NULL;  
}

/*
  Inicializamos todas as pilhas em cada coluna da nossa prateleira, utilizando o método
  para inicializar uma determinada pilha descrito anteriormente. A nossa prateleira 
  também armazenará a quantidade de livros empilhados até o momento, considerando
  todas as suas colunas.
*/
void inicializarPrateleira(Prateleira* prateleira, int colunas, int limite){
  prateleira->qtdLivros = 0;
  prateleira->colunas = colunas;
  prateleira->limite = limite;
  prateleira->pilhas = (Pilha*)malloc(colunas*sizeof(Pilha));
  int i;
  for (i = 0; i < colunas; i++)
    inicializarPilha(&(prateleira->pilhas[i]),limite);
}

/*
  Adicionamos uma nova remessa de livros na nossa prateleira cujo índice foi informado.
  O programa preenche sequencialmente em cada uma das colunas da prateleira, começando 
  da coluna zero. Ou seja, caso não haja mais espaço na coluna 0, irá preencher na coluna 1
  e assim por diante, até que todos os livros do nosso compartimento auxiliar sejam desempilhados
  e alocados na prateleira informada.
*/
void adicionarLivros(Prateleira* prateleiras, Pilha* aux, int prat){
  int coluna = 0;
  while (aux->tamanho > 0){
    while (aux->tamanho > 0 && prateleiras[prat].pilhas[coluna].tamanho < prateleiras[prat].pilhas[coluna].limite){
       Livro* livro = desempilhar(&(*aux));
       empilhar(&(prateleiras[prat].pilhas[coluna]),*livro);
       prateleiras[prat].qtdLivros++;
    }
    coluna++;
  }
}

/*
  Exibimos todos os livros armazenados em cada uma das colunas de cada uma das prateleiras
  da nossa estante, utilizando o compartimento auxiliar para exibir os livros na ordem
  correta (ordem de empilhamento).
*/
void imprimirLivros(Prateleira* prateleiras, int prat, Pilha* aux){
  printf("[LIVROS DA PRATELEIRA %d]\n",prat);
  Prateleira* prateleira = &(prateleiras[prat]);
  int i;
  for (i = 0; i < prateleira->colunas; i++){
    printf("Coluna %d:",i);
    Pilha livros = prateleira->pilhas[i];
    while (livros.tamanho > 0){
      Livro* livro = desempilhar(&livros);
      printf(" [%s]",livro->nome);
      empilhar(&(*aux),*livro);
    }
    while (aux->tamanho > 0){
      Livro* livro = desempilhar(&(*aux));
      empilhar(&livros,*livro);
    }
    printf("\n");
  }
}

/*
  Removemos um determinado livro de uma determinada prateleira, numa determinada
  coluna, cuja altura em relação ao primeiro livro empilhado na coluna foi informada.
  Caso essa altura seja maior que o tamanho da pilha, não deixamos remover, pois essa
  posĩção não existe na coluna. Caso contŕario, desempilhamos todos os livros acima
  do livro que queremos remover, desempilhamos esse livro da nossa coluna e em seguida
  empilhamos novamente os livros desempilhados anteriormente na mesma coluna.
*/
Livro* removerLivro(Prateleira* prateleiras, int p, int c, int l, Pilha* aux){
  if (l > prateleiras[p].pilhas[c].tamanho-1)
    return NULL;
  int tamanhoOriginal = prateleiras[p].pilhas[c].tamanho;
  while (aux->tamanho < tamanhoOriginal - (l + 1)){
    Livro* livro = desempilhar(&(prateleiras[p].pilhas[c]));
    empilhar(&(*aux),*livro);
  }
  Livro* livro = desempilhar(&(prateleiras[p].pilhas[c]));
  while (aux->tamanho > 0){
    Livro* movido = desempilhar(&(*aux));
    empilhar(&(prateleiras[p].pilhas[c]),*movido);
  }
  prateleiras[p].qtdLivros--;
  return &(*livro);
}

/*
  Desempilhamos todos os livros de uma determinada coluna de uma determinada prateleira de um preço X para uma outra
  coluna de outra determinada prateleira de um outro preço Y, utilizando o compartimento auxiliar para manter 
  a ordem de empilhamento.
*/
void mudarPrecos(Prateleira* prateleiras, int prat_origem, int col_origem, int prat_destino, int col_destino, Pilha* aux){
  while (prateleiras[prat_origem].pilhas[col_origem].tamanho > 0){
    Livro* livro = desempilhar(&(prateleiras[prat_origem].pilhas[col_origem]));
    prateleiras[prat_origem].qtdLivros--;
    empilhar(&(*aux),*livro);
  }
  while (aux->tamanho > 0){
    Livro* livro = desempilhar(&(*aux));
    empilhar(&(prateleiras[prat_destino].pilhas[col_destino]),*livro);
    prateleiras[prat_destino].qtdLivros++;
  }
}

/*
  Reorganizamos as colunas de uma determinada prateleira informada, com base numa nova configuração
  de índices informada. Para isso, iremos trocar a pilha que está na posição informada pela 
  nova configuração pela pilha que estamos percorrendo. Ou seja, se configuracao[i] = x, logo 
  a coluna que está na posição X receberá a pilha que está na coluna de posição i, para todas
  as posições i da nossa prateleira.
*/
void reorganizarPrateleira(Prateleira* prateleiras, int prat, int* configuracao, Pilha* aux){
  Prateleira pratAux;
  inicializarPrateleira(&pratAux,prateleiras[prat].colunas,prateleiras[prat].limite);

  int i;
  for (i = 0; i < prateleiras[prat].colunas; i++){
    while (prateleiras[prat].pilhas[i].tamanho > 0){
      Livro* livro = desempilhar(&(prateleiras[prat].pilhas[i]));
      empilhar(&(pratAux.pilhas[configuracao[i]]),*livro);
    }
  }
  for (i = 0; i < prateleiras[prat].colunas; i++){
    while (pratAux.pilhas[i].tamanho > 0){
      Livro* livro = desempilhar(&(pratAux.pilhas[i]));
      empilhar(&(prateleiras[prat].pilhas[i]),*livro);
    }
  }
}

/*
  Calculamos e exibimos o preço total de todos livros em cada prateleira, que será o nosso 
  montante parcial de cada prateleira (número de livros na prateleira multiplicado
  pelo preço referente a cada livro naquela prateleira). Também calculamos e exibimos o 
  montante total referente à estente, que será a somatória de todos os montantes parciais
  de cada uma das prateleiras.
*/
void calcularMontante(Prateleira* prateleiras, int qtdPrateleiras){
  float montantes[qtdPrateleiras];
  float montanteTotal = 0;
  int i;
  for (i = 0; i < qtdPrateleiras; i++){
    montantes[i] = prateleiras[i].qtdLivros * prateleiras[i].preco;
    montanteTotal += montantes[i];
  }
  printf("[VALOR TOTAL DA ESTANTE $%.0f] dos quais:\n",montanteTotal);
  for (i = 0; i < qtdPrateleiras; i++)
    printf("Prateleira %d: $%.0f\n",i,montantes[i]);
}