#include <stdio.h>
#include <stdlib.h>

typedef struct{
  char* nome;
} Livro;

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
void imprimirLivros(Prateleira* prateleiras, int prat);
void mudarPrecos(Prateleira* prateleiras, int prat_origem, int col_origem, int prat_destino, int col_destino);
void calcularMontante(Prateleira* prateleiras, int qtdPrateleiras);
void reorganizarPrateleira(Prateleira* prateleiras, int prat, int* configuracao);
Livro* removerLivro(Prateleira* prateleiras, int p, int c, int l);

int main(){
  int p,c,l;
  scanf("%d %d %d\n",&p,&c,&l);
  
  Prateleira* prateleiras = (Prateleira*)malloc(p*sizeof(Prateleira));
  int i,j;
  for (i = 0; i < p-1; i++){
    scanf("%f ",&(prateleiras[i].preco));
    inicializarPrateleira(&(prateleiras[i]),c,l);
  }
  scanf("%f\n",&(prateleiras[i].preco));
  inicializarPrateleira(&(prateleiras[i]),c,l);

  Pilha aux;
  inicializarPilha(&aux,2*l);

  int operacao;
  while (scanf("%d",&operacao) != EOF){
    switch (operacao){
      case 1:{
        int prat,qtd;
        scanf("%d %d ",&prat,&qtd);
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
          printf("Espaco insuficiente na prateleira de custo $%.0f. Favor remover os livros do compartimento auxiliar\n",
          	      prateleiras[prat].preco);
          while (aux.tamanho > 0)
            desempilhar(&aux);
        }
        else{
          adicionarLivros(&(*prateleiras),&aux,prat);
          printf("Foram inseridos com sucesso %d livros na prateleira de custo $%.0f\n",qtd,prateleiras[prat].preco);
        }
      } break;
      case 2:{
        int p,c,l;
        scanf("%d %d %d",&p,&c,&l);
        Livro* livroRemovido = removerLivro(&(*prateleiras),p,c,l);
        if (livroRemovido == NULL)
          printf("Nao existe nenhum livro na posicao desejada\n");
        else
          printf("Livro %s removido com sucesso da coluna %d da prateleira de custo $%.0f\n",
            livroRemovido->nome,c,prateleiras[p].preco
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
          mudarPrecos(&(*prateleiras),prat_origem,col_origem,prat_destino,col_destino);
          printf("A mudanca de livros : [%d, $%.0f] ==> [%d, $%.0f] foi feita com sucesso\n",
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
        reorganizarPrateleira(&(*prateleiras),prat,&(*configuracao));
        printf("A reorganizacao da prateleira %d foi feita com sucesso\n",prat);
      } break;
      case 5:{
        calcularMontante(&(*prateleiras),p);
      } break;
      default:{
        int prat;
        scanf("%d",&prat);
        imprimirLivros(&(*prateleiras),prat);
      }
    }
  }

  return 0;
}

void inicializarPilha(Pilha* pilha, int limite){
  pilha->tamanho = 0;
  pilha->limite  = limite;
  pilha->livros  = (Livro**)malloc(limite*sizeof(Livro*));
  int i;
  for (i = 0; i < limite; i++)
    pilha->livros[i] = NULL;
}

void liberarPilha(Pilha* pilha){
  free(pilha->livros);
}

void empilhar(Pilha* pilha, Livro livro){
  pilha->livros[pilha->tamanho] = (Livro*)malloc(sizeof(Livro));
  *(pilha->livros[pilha->tamanho]) = livro;
  pilha->tamanho++;
}

Livro* desempilhar(Pilha* pilha){
  if (pilha->tamanho > 0){
    Livro livroDesempilhado = *(pilha->livros[pilha->tamanho-1]);
    free(pilha->livros[pilha->tamanho-1]);
    pilha->livros[pilha->tamanho-1] = NULL;
    pilha->tamanho--;
    Livro livro;
    Livro* ponteiroLivro = &livro;
    *ponteiroLivro = livroDesempilhado;
    return ponteiroLivro;
  }
  return NULL;  
}

void inicializarPrateleira(Prateleira* prateleira, int colunas, int limite){
  prateleira->qtdLivros = 0;
  prateleira->colunas = colunas;
  prateleira->limite = limite;
  prateleira->pilhas = (Pilha*)malloc(colunas*sizeof(Pilha));
  int i;
  for (i = 0; i < colunas; i++)
    inicializarPilha(&(prateleira->pilhas[i]),limite);
}

void adicionarLivros(Prateleira* prateleiras, Pilha* aux, int prat){
  int coluna = 0;
  int qtdLivros = aux->tamanho;
  while (aux->tamanho > 0){
    Pilha* pilha = &(prateleiras[prat].pilhas[coluna++]);
    while (aux->tamanho > 0 && pilha->tamanho < pilha->limite){
       Livro* livro = desempilhar(&(*aux));
       empilhar(pilha,*livro);
    }
  }
  prateleiras[prat].qtdLivros += qtdLivros;
}

void imprimirLivros(Prateleira* prateleiras, int prat){
  printf("[LIVROS DA PRATELEIRA %d]\n",prat);
  Prateleira* prateleira = &(prateleiras[prat]);
  int i;
  for (i = 0; i < prateleira->colunas; i++){
    printf("Coluna %d:",i);
    Pilha livros = prateleira->pilhas[i];
    Pilha aux;
    inicializarPilha(&aux,prateleira->limite);
    while (livros.tamanho > 0){
      Livro* livro = desempilhar(&livros);
      printf("[%s]",livro->nome);
      empilhar(&aux,*livro);
    }
    while (aux.tamanho > 0){
      Livro* livro = desempilhar(&aux);
      empilhar(&livros,*livro);
    }
    printf("\n");
  }
}

Livro* removerLivro(Prateleira* prateleiras, int p, int c, int l){
  Prateleira* prateleira = &(prateleiras[p]);
  Pilha* livros = &(prateleira->pilhas[c]);
  if (l > livros->tamanho-1)
    return NULL;
  Pilha aux;
  inicializarPilha(&aux,prateleira->limite);
  while (aux.tamanho < livros->limite - (l + 1)){
    Livro* livro = desempilhar(&(*livros));
    empilhar(&aux,*livro);
  }
  Livro* livro = desempilhar(&(*livros));
  while (aux.tamanho > 0){
    Livro* movido = desempilhar(&aux);
    empilhar(&(*livros),*livro);
  }
  Livro conteudoLivro;
  Livro* ponteiroLivro = &conteudoLivro;
  *ponteiroLivro = *livro;
  return ponteiroLivro;
}

void mudarPrecos(Prateleira* prateleiras, int prat_origem, int col_origem, int prat_destino, int col_destino){
  Prateleira* pratOrigem = &(prateleiras[prat_origem]);
  Pilha* livrosOrigem = &(pratOrigem->pilhas[col_origem]);
  
  Prateleira* pratDestino = &(prateleiras[prat_destino]);
  Pilha* livrosDestino = &(pratDestino->pilhas[col_destino]);

  Pilha aux;
  inicializarPilha(&aux,pratOrigem->limite);
  while (livrosOrigem->tamanho > 0){
    Livro* livro = desempilhar(&(*livrosOrigem));
    empilhar(&aux,*livro);
  }
  while (aux.tamanho > 0){
    Livro* livro = desempilhar(&aux);
    empilhar(&(*livrosDestino),*livro);
  }
}

void reorganizarPrateleira(Prateleira* prateleiras, int prat, int* configuracao){
  Prateleira* prateleira = &(prateleiras[prat]);
  int i;
  for (i = 0; i < prateleira->colunas; i++){
    Pilha* livrosA = &(prateleira->pilhas[i]);
    Pilha* livrosB = &(prateleira->pilhas[configuracao[i]]);
    Pilha aux;
    inicializarPilha(&aux,livrosA->limite);
    while (livrosA->tamanho > 0){
      Livro* livro = desempilhar(&(*livrosA));
      empilhar(&aux,*livro);
    }
    while (livrosB->tamanho > 0){
      Livro* livro = desempilhar(&(*livrosB));
      empilhar(&aux,*livro);
    }
    while (aux.tamanho > livrosA->tamanho){
      Livro* livro = desempilhar(&aux);
      empilhar(&(*livrosA),*livro);
    }
    while (aux.tamanho > 0){
      Livro* livro = desempilhar(&aux);
      empilhar(&(*livrosB),*livro);
    }
  }
}

void calcularMontante(Prateleira* prateleiras, int qtdPrateleiras){
  float montantes[qtdPrateleiras];
  float montanteTotal = 0;
  int i;
  for (i = 0; i < qtdPrateleiras; i++){
    Prateleira prateleira = prateleiras[i];
    montantes[i] = prateleira.qtdLivros * prateleira.preco;
    montanteTotal += montantes[i];
  }
  printf("[VALOR TOTAL DA ESTANTE $%.0f] dos quais:\n",montanteTotal);
  for (i = 0; i < qtdPrateleiras; i++)
    printf("Prateleira %d: $%.0f\n",i,montantes[i]);
}