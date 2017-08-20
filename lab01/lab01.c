/*  
  Matheus Esteves Zanoto,   RA 184256

  
*/

#include <stdio.h>
#include <stdlib.h>

typedef struct{
  int idProduto;
  int quantidadeProdutos;
} Produto;

typedef struct{
  Produto* produtos;
  int produtosAdicionados;
  int somaProdutos;
} Setor;

void adicionar(Setor* setores,Produto produto,int setor){
  Setor setorInclusao = setores[setor];
  setorInclusao.produtos[setorInclusao.produtosAdicionados] = produto;
  setorInclusao.produtosAdicionados++;
  setorInclusao.somaProdutos += produto.quantidadeProdutos;
  setores[setor] = setorInclusao;
}

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
    setores = (Setor*)malloc(quantidadeSetores*sizeof(Setor));
    for (i = 0; i < quantidadeSetores; i++){
      setores[i].produtos = (Produto*)malloc(produtosPorSetor*sizeof(Produto));
      setores[i].produtosAdicionados = 0; 
      setores[i].somaProdutos = 0;
    }

    int setor,idProduto,quantidadeProdutos;
    scanf("%d %d %d",&setor,&idProduto,&quantidadeProdutos);
    do{
      Produto produto;
      produto.idProduto = idProduto;
      produto.quantidadeProdutos = quantidadeProdutos;
      adicionar(setores,produto,setor);
    } while (scanf("%d %d %d",&setor,&idProduto,&quantidadeProdutos) != EOF);

    for (i = 0; i < quantidadeSetores; i++){
      int somaProdutos = setores[i].somaProdutos;
      double mediaProdutos = 0;
      if (somaProdutos > 0 && setores[i].produtosAdicionados > 0){
        mediaProdutos = (double)somaProdutos / (double)setores[i].produtosAdicionados;
        printf("%d %d %.2lf\n",i,somaProdutos,mediaProdutos);
      }
    }
  }

  if (produtoEmVariosSetores(setores,quantidadeSetores) == 0)
    printf("NAO");
  else
    printf("SIM");
  printf("\n");

  for (i = 0; i < quantidadeSetores; i++){
    free(setores[i].produtos);
  }
  free(setores);

  return 0;
}