#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct{
  int codigo;
  char[] nomẽ;
  int telefone;
  int preferido;
} Contato;

struct No{
  Contato contato;
  struct No* prox;
  struct No* ant;
};

typedef struct No No;

typedef struct{
  No* sel;
  int tamanho;
} Lista;

void init_lista(Lista* lista){
  lista->sel = NULL;
  lista->tamanho = 0;
}

void liberarLista(Lista* lista){
  
}

void init_no(No** no, Contato contato){
  *no = (No*)malloc(sizeof(No));
  (*no)->prox = NULL;
  (*no)->ant = NULL;
  (*no)->contato = contato;
}

void inserirContato(Lista* lista, int codigo, char* nome, int telefone){
  Contato contato;
  contato.codigo = codigo;
  strcpy(contato.nome,nome);
  contato.telefone = telefone;
  contato.preferido = 0;

  No* novoNo;
  No* aux;
  init_no(&novoNo,contato);
  if (lista->sel == NULL)
    lista->sel = novoNo;
  else{
  	aux = lista->sel->prox;
    lista->sel->prox = novoNo;
    novoNo->ant = lista->sel;
  }
  
  if (lista->sel->ant == NULL)
    aux = lista->sel;
  novoNo->prox = aux;
  aux->ant = novoNo;
  lista->tamanho++;
}

Contato* removerContato(Lista* lista, int codigo){
  No* atual = lista->sel;
  if (atual == NULL)
    return NULL;

  while ((atual->contato).codigo != codigo){
    atual = atual->prox;
    if (atual == NULL || atual == lista->sel)
      return NULL;
  }

  if (atual == lista->sel)
    lista->sel = atual->ant;

  No* ant = atual->ant;
  No* prox = atual->prox;
  if (ant != NULL){
  	if (ant == lista->sel && prox == lista->sel){
  	  ant->prox = NULL;
  	  prox->ant = NULL;
  	}
  	else{
      ant->prox = prox;
      prox->ant = ant;
    }
  }

  Contato contatoRemovido = atual->contato;
  free(atual);
  lista->tamanho--;
  return &contatoRemovido;
}

Contato* efetuarLigacao(Lista* lista, int telefone){
  No* atual = lista->sel;
  if (atual == NULL)
    return NULL;

  while ((atual->contato).telefone != telefone){
    atual = atual->prox;
    if (atual == NULL || atual == lista->sel)
      return NULL;
  }

  if (atual != lista->sel)
    lista->sel = atual;
  return &(atual->contato);
}

Contato* avancar(Lista* lista, int n){
  No* atual = lista->sel;
  if (atual == NULL)
    return NULL;

  int m = n % lista->tamanho;
  if (m == 0)
    return &(atual->contato);

  int i;
  for (i = 1; i <= m && atual != NULL; i++)
    atual = atual->prox;
  
  if (atual == NULL)
    atual = lista->sel;
  else
    lista->sel = atual;
  return &(atual->contato);
}

Contato* retroceder(Lista* lista, int n){
  No* atual = lista->sel;
  if (atual == NULL)
    return NULL;
  
  int m = n % lista->tamanho;
  if (m == 0)
    return &(atual->contato);

  int i;
  for (i = 1; i <= m && atual != NULL; i++)
    atual = atual->ant;

  if (atual == NULL)
    atual = lista->sel;
  else
  	lista->sel = atual;
  return &(atual->contato);
}

Contato* assinalarPreferido(Lista* lista, char* nome){
  No* atual = lista->sel;
  if (atual == NULL)
    return NULL;
  
  while (strcmp(nome,(atual->contato).nome) != 1){
  	atual = atual->prox;
  	if (atual == NULL || atual == lista->sel)
  	  return NULL;
  }

  (atual->contato).preferido = 1;
  return &(atual->contato);
}

void imprimirContatos(Lista* lista, char letra){
  printf("[CONTATOS​ COM​ INICIAL​ %c]\n",letra);
  int n = 0;
  No* atual = lista->sel;
  do{
  	Contato contato = atual->contato;
    if ((contato.nome)[0] == letra){
      n++;
      char* preferido;
      if (contato.preferido == 1)
        strcpy(preferido,"PREFERIDO");
      else
        strcpy(preferido,"N_PREFERIDO");
      printf("Contato​ %s (telefone​ %d) codigo:​ %d [%s]\n",contato.nome,contato.telefone,contato.codigo,preferido);
    }
  }
  while (atual != NULL && atual != lista->sel);

  if (n == 0)
    printf("Nenhum contato encontrado\n");
}

void imprimirPreferidos(Lista* lista){
  printf("[CONTATOS PREFERIDOS]\n");
  int n = 0
  No* atual = lista->sel;
  do{
    Contato contato = atual->contato;
    if (contato.preferido == 1){
      n++;
      printf("Contato​ %s (telefone​ %d) codigo:​ %d\n",contato.nome,contato.telefone,contato.codigo);
    }
  }
  while (atual != NULL && atual != lista->sel);

  if (n == 0)
    printf("Nenhum preferido encontrado\n");
}

int main(){
  Lista contatos;
  init_lista(&contatos);

  int operacao;
  while (scanf("%d",&operacao) != EOF){
    switch (operacao){
      case 1:{
        int codigo,telefone;
        char* nome;
        scanf("%d %s %d",&codigo,nome,&telefone);
        inserirContato(&lista,codigo,nome,telefone);
        printf("Contato​ %s (telefone​ %d) adicionado​​ na​ agenda\n",nome,telefone);
      } break;
      case 2:{
        int codigo;
        scanf("%d",&codigo);
        Contato* contatoRemovido = removerContato(&lista,codigo);
        if (contatoRemovido != NULL)
          printf("Contato​ %s (telefone​ %d) removido da​ agenda\n",contatoRemovido.nome,contatoRemovido.telefone);
        else
          printf("Contato nao existe\n");
      } break;
      case 3:{
        int codigo;
        scanf("%d",&codigo);
        Contato* contatoLigado = efetuarLigacao(&lista,codigo);
        if (contatoLigado != NULL)
          printf("Ligando para %s (telefone​ %d)\n",contatoLigado.nome,contatoLigado.telefone);
        else
          printf("Contato nao existe\n");
      } break;
      case 4:{
        int n;
        scanf("%d",&n);
        Contato* contatoSelecionado = avancar(&lista,n);
        if (contatoSelecionado != NULL)
          printf("Contato​ %s (telefone​ %d) selecionado\n",contatoSelecionado.nome,contatoSelecionado.telefone);
        else
          printf("Agenda vazia\n");
      } break;
      case 5:{
        int n;
        scanf("%d",&n);
        Contato* contatoSelecionado = retroceder(&lista,n);
        if (contatoSelecionado != NULL)
          printf("Contato​ %s (telefone​ %d) selecionado\n",contatoSelecionado.nome,contatoSelecionado.telefone);
        else
          printf("Agenda vazia\n");
      } break;
      case 6:{
        char* nome;
        scanf("%s",nome);
        Contato* contatoAssinalado = assinalarPreferido(&lista,nome);
        if (contatoSelecionado != NULL)
          printf("Contato​ %s (telefone​ %d) assinalado como preferido\n",contatoAssinalado.nome,contatoAssinalado.telefone);
        else
          printf("Contato nao existe\n");
      } break;
      case 7:{
        char letra;
        scanf("%c",&letra);
        imprimirContatos(&lista,letra);
      } break;
      default:{
        imprimirPreferidos(&lista);
      }
    }
    liberarLista(&lista);
  }

  return 0;
}