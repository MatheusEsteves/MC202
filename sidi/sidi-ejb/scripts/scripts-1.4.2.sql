alter table distribuicaoprincipal add COMUTACAO_ID NUMBER add constraint CANALPRINCIPALCOMUTACAOFK
FOREIGN KEY (COMUTACAO_ID) references comutacao (ID)