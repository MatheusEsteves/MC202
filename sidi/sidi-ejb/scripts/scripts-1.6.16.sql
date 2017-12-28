CREATE TABLE "SIDI"."CONFIGURACAO"
(
   ID decimal(19,0) PRIMARY KEY NOT NULL,
   integrarLiveAdmin varchar2(255) NOT NULL,
   urlLiveAdmin varchar2(120) NOT NULL,
   tokenLiveAdmin varchar2(120) NOT NULL,
   horasAntecedencia decimal(19,0) NOT NULL,
   horasPosteriores decimal(19,0) NOT NULL
)
;

alter table comutacao add transmissionId number(19,0);
alter table canal add mediaId number(19,0);
alter table canal add channelCod varchar2(120);