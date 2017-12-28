CREATE TABLE CLUBEESTADIO (
  ID decimal(19,0) PRIMARY KEY NOT NULL,
  CLUBE_ID NUMBER(19, 0) NOT NULL,
  ESTADIO_ID NUMBER(19, 0) NOT NULL
);

CREATE UNIQUE INDEX UNIQUE_CLUBEESTADIO ON CLUBEESTADIO
(
  CLUBE_ID,
  ESTADIO_ID
);

ALTER TABLE ESTADIO ADD AFILIADA_ID DECIMAL(19,0);
ALTER TABLE ESTADIO ADD CONSTRAINT fk_afiliada FOREIGN KEY (AFILIADA_ID) REFERENCES AFILIADA(ID);

update cidade set estado = 'RN' where nome = 'Goianinha';
update cidade set estado = 'PR' where nome = 'Paranaguá';
update cidade set estado = 'SP' where nome = 'Penápolis';
update cidade set estado = 'SP' where nome = 'Santa Bárbara do Oeste';
update cidade set estado = 'RS' where nome = 'Porto Alegre';
update cidade set estado = 'PE' where nome = 'São Lourenço da Mata';
update cidade set estado = 'GO' where nome = 'Itumbiara';
update cidade set estado = 'MT' where nome = 'Cuiabá';
update cidade set estado = 'SP' where nome = 'São Paulo';