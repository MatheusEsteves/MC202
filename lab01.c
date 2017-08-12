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

int main(){
  int quantidadeSetores,produtosPorSetor;

  scanf("%d %d",&quantidadeSetores,&produtosPorSetor);

  Setor* setores = (Setor*)malloc(quantidadeSetores*sizeof(Setor));
  int i;
  for (i = 0; i < quantidadeSetores; i++){
    setores[i].produtos = (Produto*)malloc(produtosPorSetor*sizeof(Produto));
    setores[i].produtosAdicionados = 0;
    setores[i].somaProdutos = 0;
  }

  int setor,idProduto,quantidadeProdutos,setorAnterior,idProdutoAnterior,produtoIgual;
  scanf("%d %d %d",&setor,&idProduto,&quantidadeProdutos);
  produtoIgual = 0;
  setorAnterior = setor;
  idProdutoAnterior = idProduto;
  do{
    if (setorAnterior == setor && idProdutoAnterior == idProduto)
      produtoIgual = 1;
    setorAnterior = setor;
    idProdutoAnterior = idProduto;
    Produto produto;
    produto.idProduto = idProduto;
    produto.quantidadeProdutos = quantidadeProdutos;
    adicionar(setores,produto,setor);
  } while (scanf("%d %d %d",&setor,&idProduto,&quantidadeProdutos) && setor != EOF);

  for (i = 0; i < quantidadeSetores; i++){
    int somaProdutos = setores[i].somaProdutos;
    float mediaProdutos = somaProdutos / setores[i].produtosAdicionados;
    printf("%d %d %.2f\n",i,somaProdutos,mediaProdutos);
  }

  if (produtoIgual == 0)
    printf("NAO");
  else
    printf("SIM");
  printf("\n");

  return 0;
}
