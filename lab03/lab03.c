/*
  Nome: Matheus Esteves Zanoto    RA: 184256

  Objetivos: O objetivo desse programa é organizar uma lista duplamente circular de contatos, com 
  base em um contato que será selecionado em relação aos outros. Teremos as operações para incluir 
  um novo contato, remover um determinado contato, ligar para um determinado contato, avançar e 
  retroceder o contato selecionado na lista, marcar um determinado contato como preferido ou 
  imprimir a lista de contatos.

  Entradas: O primeiro caráter a ser lido será o tipo de operação, que poderá ser :
    1 - inserir contato (os parâmetros seguintes são o código, nome e telefone do contato a ser inserido) 
    2 - remover contato (o parâmetro seguinte é o código do contato a ser removido)
    3 - ligar para um determinado contato (o parâmetro seguinte é o telefone de um determinado contato a ser ligado)
    4 - avançar um determinado número de contatos (o parâmetro seguinte é o número de contatos que iremos avançar)
    5 - retroceder um determinado número de contatos (o parâmetro seguite é o número de contatos que iremos retroceder)
    6 - assinalar um determinado contato como preferido (o parâmetro seguinte é o nome de um contato que queremos marcar como 
    preferido)
    7 - imprimir todos os contatos com uma determinada letra inicial (o parâmetro seguinte é uma letra inicial)
    8 - imprimir todos os contatos preferidos (sem parâmetro em seguida)

  Saídas: Serão imprimidas 8 possíveis saídas conforme as operações :
    1 - Contato non (telefone tel) adicionado na agenda
    2 - Contato non (telefone tel) removido da agenda ou Contato nao existe
    3 - Ligando para non (telefone tel) ou Contato nao existe
    4 - Contato non (telefone tel) selecionado ou Agenda vazia
    5 - Contato non (telefone tel) selecionado ou Agenda vazia
    6 - Contato non (telefone tel) assinalado como preferido
    7  [CONTATOS COM INICIAL %c]
        Contato non1 (telefone tel1) codigo: cod1 [PREFERIDO]
        Contato non2 (telefone tel2) codigo: cod2 [N_PREFERIDO]
         . 
         .
         .
        Contato nonk (telefone telk) codigo: codk [PREFERIDO]
        ou
        [CONTATOS COM INICIAL %c]
        Nenhum contato encontrado

    8  [CONTATOS PREFERIDOS]
         Contato non1 (telefone tel1) codigo: cod1
         Contato non2 (telefone tel2) codigo: cod2
          .
          .
          .
         Contato nonk (telefone telk) codigo: codk
         ou 
         [CONTATOS COM INICIAL %c]
         Nenhum preferido encontrado

*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
  Estrutura que define um determinado contato
*/
typedef struct{
  int codigo;
  int telefone;
  int preferido;
  char nome[30];
} Contato;

/*
  Estrutura que define um determinado nó, contendo um determiando contato e os 
  ponteiros que dão acesso aos nós anterior e posterior à esse.
*/
struct No{
  Contato contato;
  struct No* prox;
  struct No* ant;
};

typedef struct No No;

/*
  Estrutura que define uma determinada lista, contendo o nó selecionado no momento e 
  o tamanho da lista.
*/
typedef struct{
  No* sel;
  int tamanho;
} Lista;

void init_lista(Lista* lista){
  lista->sel = NULL;
  lista->tamanho = 0;
}

/*
  Libera da memória todos os nós da lista ligada duplamente circular, através de uma
  referência para o próximo nó.
*/
void liberarLista(Lista* lista){
   No* atual = lista->sel;
   No* aux;
   if (atual != NULL){
     if (atual->ant == NULL)
       free(atual);
     else{
       while (atual != NULL)
         if (atual->ant != NULL){
           free(atual->ant);
           atual->ant = NULL;
           aux = atual;
           atual = atual->prox;
         }
       free(aux);
     }
   }
}

/*
  Inicializamos um determinado nó com base em um determinado contato, 
  que incluiremos nesse nó.
*/
void init_no(No** no, Contato contato){
  *no = (No*)malloc(sizeof(No));
  (*no)->prox = NULL;
  (*no)->ant = NULL;
  (*no)->contato = contato;
}

/*
  Inserimos um determinado contato na lista circular. Se o selecionado for vazio,
  estaremos adicinando o primeiro contato da lista e portanto, selecionado aponta 
  para ele. Caso contrário, poderemos estar incluindo o segundo contato na lista
  ou inserindo entre dois contatos já existentes, que requerem tratamentos diferentes
  quando ao apontamento dos dados.
*/
void inserirContato(Lista* lista, Contato contato){
  No* novoNo;
  No* aux;
  init_no(&novoNo,contato);
  if (lista->sel == NULL)
    lista->sel = novoNo;
  else{
  	if (lista->sel->prox == NULL)
  	  aux = lista->sel;
  	else
      aux = lista->sel->prox;
    lista->sel->prox = novoNo;
    novoNo->ant = lista->sel;
    novoNo->prox = aux;
    aux->ant = novoNo;
  }

  lista->tamanho++;
}

/*
 Caso a lista esteja vazia (lista->sel == NULL), retornamos
 um ponteiro nulo para o contato removido. O mesmo ocorre para
 caso não acharmos o contato cujo código foi passado como parâmetro (caso
 percorrermos toda a lista circular e voltarmos para a mesma posição de início).
 Caso acharmos o elemento a ser removido, ele será liberado da memória e os 
 apontamentos dos ponteiros anterior e posterior a ele irão mudar. Ao 
 remover um contato, retornamos um ponteiro para o contato removido.
*/
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

  Contato c;
  Contato* contatoRemovido = &c;
  *contatoRemovido = atual->contato;
  free(atual);
  lista->tamanho--;
  return contatoRemovido;
}

/*
  Caso a lista esteja vazia (lista->sel == NULL), retornamos
 um ponteiro nulo para o contato ligado. O mesmo ocorre para
 caso não acharmos o contato cujo telefone foi passado como parâmetro (caso
 percorrermos toda a lista circular e voltarmos para a mesma posição de início).
 Caso acharmos o elemento a ser telefonado, ele será o próximo selecionado 
 e retornamos um ponteiro para o contato selecionado.
*/
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
  
  Contato c;
  Contato* contatoLigado = &c;
  *contatoLigado = atual->contato;
  return contatoLigado;
}

/*
  Avançamos (n % lista->tamanho) nós na lista circular 
  e o próximo selecionado será o contato em que o avanço parou.
*/
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

  Contato c;
  Contato* contatoAvancado = &c;
  *contatoAvancado = atual->contato;
  return contatoAvancado;
}

/*
  Retrocedemos (n % lista->tamanho) nós na lista circular 
  e o próximo selecionado será o contato em que o retrocesso parou.
*/
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
  
  Contato c;
  Contato* contatoRetrocedido = &c;
  *contatoRetrocedido = atual->contato;
  return contatoRetrocedido;
}

/*
  Caso a lista esteja vazia (lista->sel == NULL), retornamos
 um ponteiro nulo para o contato marcado como preferido. O mesmo ocorre para
 caso não acharmos o contato cujo nome foi passado como parâmetro (caso
 percorrermos toda a lista circular e voltarmos para a mesma posição de início).
 Caso acharmos o elemento a ser marcado, ele terá seu atributo PREFERIDO alterado
 para 1 e retornamos um ponteiro para o contato marcado como preferido.
*/
Contato* assinalarPreferido(Lista* lista, char* nome){
  No* atual = lista->sel;
  if (atual == NULL)
    return NULL;
  
  while (strcmp(nome,(atual->contato).nome) != 0){
  	atual = atual->prox;
  	if (atual == NULL || atual == lista->sel)
  	  return NULL;
  }
  (atual->contato).preferido = 1;

  Contato c;
  Contato* contatoPreferido = &c;
  *contatoPreferido = atual->contato;
  return contatoPreferido;
}

/*
  Imprimimos todos os contatos cujo nome se inicie com uma determinada letra
  informada no momento da impressão.
*/
void imprimirContatos(Lista* lista, char letra){
  printf("[CONTATOS COM INICIAL %c]\n",letra);
  int n = 0;
  No* atual = lista->sel;
  do{
  	Contato contato = atual->contato;
    if ((contato.nome)[0] == letra){
      n++;
      char preferido[13];
      if (contato.preferido == 1)
        strcpy(preferido,"PREFERIDO");
      else
        strcpy(preferido,"N_PREFERIDO");
      printf("Contato %s (telefone %d) codigo: %d [%s]\n",contato.nome,contato.telefone,contato.codigo,preferido);
    }
    atual = atual->prox;
  }
  while (atual != NULL && atual != lista->sel);

  if (n == 0)
    printf("Nenhum contato encontrado\n");
}

/*
  Imprimimos todos os contatos marcados como preferidos. 
*/
void imprimirPreferidos(Lista* lista){
  printf("[CONTATOS PREFERIDOS]\n");
  int n = 0;
  No* atual = lista->sel;
  do{
    Contato contato = atual->contato;
    if (contato.preferido == 1){
      n++;
      printf("Contato %s (telefone %d) codigo: %d\n",contato.nome,contato.telefone,contato.codigo);
    }
    atual = atual->prox;
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
        Contato contato;
        scanf("%d %s %d",&contato.codigo,contato.nome,&contato.telefone);
        inserirContato(&contatos,contato);
        printf("Contato %s (telefone %d) adicionado na agenda\n",contato.nome,contato.telefone);
      } break;
      case 2:{
        int codigo;
        scanf("%d",&codigo);
        Contato* contatoRemovido = removerContato(&contatos,codigo);
        if (contatoRemovido != NULL)
          printf("Contato %s (telefone %d) removido da agenda\n",contatoRemovido->nome,contatoRemovido->telefone);
        else
          printf("Contato nao existe\n");
      } break;
      case 3:{
        int codigo;
        scanf("%d",&codigo);
        Contato* contatoLigado = efetuarLigacao(&contatos,codigo);
        if (contatoLigado != NULL)
          printf("Ligando para %s (telefone %d)\n",contatoLigado->nome, contatoLigado->telefone);
        else
          printf("Contato nao existe\n");
      } break;
      case 4:{
        int n;
        scanf("%d",&n);
        Contato* contatoSelecionado = avancar(&contatos,n);
        if (contatoSelecionado != NULL)
          printf("Contato %s (telefone %d) selecionado\n",contatoSelecionado->nome,contatoSelecionado->telefone);
        else
          printf("Agenda vazia\n");
      } break;
      case 5:{
        int n;
        scanf("%d",&n);
        Contato* contatoSelecionado = retroceder(&contatos,n);
        if (contatoSelecionado != NULL)
          printf("Contato %s (telefone %d) selecionado\n",contatoSelecionado->nome,contatoSelecionado->telefone);
        else
          printf("Agenda vazia\n");
      } break;
      case 6:{
        char nome[30];
        scanf("%s",nome);
        Contato* contatoAssinalado = assinalarPreferido(&contatos,nome);
        if (contatoAssinalado != NULL)
          printf("Contato %s (telefone %d) assinalado como preferido\n",contatoAssinalado->nome,contatoAssinalado->telefone);
        else
          printf("Contato nao existe\n");
      } break;
      case 7:{
        char letra;
        scanf("%c",&letra);	
        scanf("%c",&letra);
        imprimirContatos(&contatos,letra);
      } break;
      default:{
        imprimirPreferidos(&contatos);
      }
    }
  }

  //liberarLista(&contatos);

  return 0;
}