ALTER TABLE SIDI.OPERADORA_CANAL DROP COLUMN ID;
ALTER TABLE SIDI.OPERADORA_CANAL DROP COLUMN LINEUP;
ALTER TABLE SIDI.OPERADORA_CANAL DROP COLUMN MATRIZ;

CREATE TABLE SIDI.OPERADORACANALLINEUP
(
   OPERADORA_ID decimal(19,0) NOT NULL,
   CANAIS_ID decimal(19,0) NOT NULL,
   ID decimal(19,0) PRIMARY KEY NOT NULL,
   LINEUP decimal(19,0),
   MATRIZ varchar2(20)
);

CREATE UNIQUE INDEX UNIQUE_OPER_CANAL_LINEUP ON SIDI.OPERADORACANALLINEUP
(
  OPERADORA_ID,
  CANAIS_ID
);

INSERT INTO SIDI.OPERADORACANALLINEUP (OPERADORA_ID, CANAIS_ID, ID) 
(SELECT OPERADORA_ID, CANAIS_ID, HIBERNATE_SEQUENCE.NEXTVAL FROM OPERADORA_CANAL);

UPDATE (SELECT SIDI.OPERADORACANALLINEUP.MATRIZ AS A, SIDI.OPERADORA.MATRIZ AS B FROM SIDI.OPERADORACANALLINEUP  
INNER JOIN SIDI.OPERADORA ON SIDI.OPERADORACANALLINEUP.OPERADORA_ID = SIDI.OPERADORA.ID)
SET A = B;

ALTER TABLE CAMPEONATO ADD PESO NUMBER(19,2);
ALTER TABLE FASE ADD PESO NUMBER(19,2);

ALTER TABLE PESOCLUBEESTADO RENAME COLUMN PESO to BKP_PESO;
ALTER TABLE PESOCLUBEESTADO ADD PESO NUMBER(10, 2);

CREATE TABLE pesosistema (
  ID decimal(19,0) PRIMARY KEY NOT NULL,
  pesoCampeonato NUMBER(10, 2),
  pesoTorcida NUMBER(10, 2)
)