/*  
  Nome: Matheus Esteves Zanoto,   RA 184256

  Objetivos: O objetivo desse programa é armazenar diferentes produtos em diferentes setores
  (produtos para cada setor), em diferentes quantidades. Para cada um dos setores, calularemos
  a soma das quantidades de todos os produtos presentes nesse determinado setor, bem como a
  média da quantidade de produtos adicionados no setor, calculada com base quantidade de
  tipos de produtos adicionados e na soma calculada anteriormente.

  Entradas: 
    - int quantidadeSetores : quantidade de setores nos quais os produtos serão adicionados.
    - int produtosPorSetor : quantidade máxima de produtos que podem ser adicionados em cada setor.
    - int setor, idProduto, quantidadeProdutos: id do produto a ser adicionado no setor espeficiado, 
      em uma quantidade especificada desse produto.

  Saídas:
    - Exibiremos a soma das quantidades de todos os produtos adicionados em cada um dos setores,
    bem como a média da quantidade de produtos no setor, com base na quantidade de tipos de produtos
    adicionados nesse setor. Além disso, exibiremos SIM para caso exista algum produto presente
    em mais de um setor e NAO caso contrário:

       SETOR(1) SOMA_1 MEDIA_1
       SETOR(2) SOMA_2 MEDIA_2
             .
             .
       SETOR(N) SOMA_N MEDIA_N
       SIM/NAO
*/

#include <stdio.h>
#include <stdlib.h>

/*
 Estrutura que representa um produto, contendo seu id e a quantidade desse produto.
*/
typedef struct{
  int idProduto;
  int quantidadeProdutos;
} Produto;

/*
  Estrutura que representa um setor, contendo os produtos adicionados nesse setor,
  a quantidade de produtos adicionados e a soma das quantidades de todos os produtos
  adicinados nesse setor.
*/
typedef struct{
  Produto* produtos;
  int produtosAdicionados;
  int somaProdutos;
} Setor;

/*
  Adicionamos um determinado produto em um determinado setor, na lista de setores informada.
  Ao adicionarmos, atualizamos o campo somaProdutos desse setor, que incrementa a soma com base
  na nova quantidade do novo produto que entrou.
*/
void adicionar(Setor* setores,Produto produto,int setor){
  Setor setorInclusao = setores[setor];
  setorInclusao.produtos[setorInclusao.produtosAdicionados] = produto;
  setorInclusao.produtosAdicionados++;
  setorInclusao.somaProdutos += produto.quantidadeProdutos;
  setores[setor] = setorInclusao;
}

/*
  Verificamos se um determinado produto aparece em mais de um setor. Para isso, verificamos
  se algum produto de algum setor n está presente em algum dos setores n+1 em diante, para 
  todos os n setors presentes. Caso exista, retornamos 1, contrário, retornamos 0.
*/
int produtoEmVariosSetores(Setor* setores, int quantidadeSetores){
  int i,j,k,l;
  for (i = 0; i < quantidadeSetores; i++){
    Setor setor = setores[i];
    Produto* produtos = setor.produtos;
    int quantidadeProdutos = setor.produtosAdicionados;
    for (j = 0; j < quantidadeProdutos; j++){
      Produto produto = produtos[j];
      for (k = i + 1; k < quantidadeSetores; k++){
        Setor setorComparado = setores[k];
        Produto* produtosComparados = setorComparado.produtos;
        int quantidadeProdutosComparados = setorComparado.produtosAdicionados;
        for (l = 0; l < quantidadeProdutosComparados; l++){
          Produto produtoComparado = produtosComparados[l];
          if (produto.idProduto == produtoComparado.idProduto)
            return 1;
        }
      }
    }
  }
  return 0;
}

int main(){
  int quantidadeSetores,produtosPorSetor,i;

  scanf("%d %d",&quantidadeSetores,&produtosPorSetor);

  Setor* setores;
  if (quantidadeSetores > 0 && produtosPorSetor > 0){
    /*
      Alocamos uma lista de setores, com base na quantidade
      dos setores presentes.
    */
    setores = (Setor*)malloc(quantidadeSetores*sizeof(Setor));
    for (i = 0; i < quantidadeSetores; i++){
      /*
        Alocamos a nossa lista de produtos com a quantidade máxima de produtos
        que podem ser adicionados em cada setor e inicializamos a quantidade de
        produtos adicionados e a soma das quandiades dos produtos adicionados
        com zero, para cada um dos setores.
      */
      setores[i].produtos = (Produto*)malloc(produtosPorSetor*sizeof(Produto));
      setores[i].produtosAdicionados = 0; 
      setores[i].somaProdutos = 0;
    }

    int setor,idProduto,quantidadeProdutos;
    /*
        Enquanto não chegamos no final da leitura, iremos ler as informações de
        um determinado produto (setor no qual adicionaremos esse produto, id
        desse produto e a quantidade desse produto no setor informado).
    */
    scanf("%d %d %d",&setor,&idProduto,&quantidadeProdutos);
    do{
      Produto produto;
      produto.idProduto = idProduto;
      produto.quantidadeProdutos = quantidadeProdutos;
      /*
        Adicionamos esse produto informado no setor informado, na lista de setores.
      */
      adicionar(setores,produto,setor);
    } while (scanf("%d %d %d",&setor,&idProduto,&quantidadeProdutos) != EOF);

    /*
      Para cada um dos setores existentes, exibiremos a soma das quantidadees
      de todos os produtos de cada setor (armazenada no próprio setor), bem
      como a média das quantidades dos produtos adicionados no setor.
    */
    for (i = 0; i < quantidadeSetores; i++){
      int somaProdutos = setores[i].somaProdutos;
      double mediaProdutos = 0;
      if (somaProdutos > 0 && setores[i].produtosAdicionados > 0){
        mediaProdutos = (double)somaProdutos / (double)setores[i].produtosAdicionados;
        printf("%d %d %.2lf\n",i,somaProdutos,mediaProdutos);
      }
    }
  }

  /*
    Caso algum produto de algum setor na lista de setores esteja presente em algum
    outro setor, exibiremos SIM, caso contrário, exibiremos NAO.
  */
  if (produtoEmVariosSetores(setores,quantidadeSetores) == 0)
    printf("NAO");
  else
    printf("SIM");
  printf("\n");

  /*
    Por último, liberamos da memória a lista de produtos de cada um dos setores, bem como 
    a lista de setores.
  */
  for (i = 0; i < quantidadeSetores; i++){
    free(setores[i].produtos);
  }
  free(setores);

  return 0;
}