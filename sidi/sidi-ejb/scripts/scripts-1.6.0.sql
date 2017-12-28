DROP TABLE DISTRIBUICAOHISTORICO;

DROP TABLE DISTRIBUICAOOPERADORAHISTORICO;

DROP TABLE DISTRIBUICAOOPERADORA_OLD;

INSERT INTO SIDI.PERFIL_FUNCIONALIDADES SELECT ID, 'CONSULTAR_DISTRIBUICAO_OPERADORA' FROM SIDI.PERFIL WHERE NOME = 'Programador';

INSERT INTO SIDI.PERFIL_FUNCIONALIDADES SELECT ID,  'GERENCIAR_DISTRIBUICAO_OPERADORA' FROM SIDI.PERFIL WHERE NOME = 'Programador';

INSERT INTO SIDI.USUARIO_OPERADORA SELECT '7051480', ID FROM SIDI.OPERADORA WHERE APAGADO = 'NAO';

ALTER TABLE SIDI.DISTRIBUICAOPRINCIPAL DROP CONSTRAINT FKFDC28B638E884D0;

ALTER TABLE SIDI.DISTRIBUICAOOPERADORA DROP CONSTRAINT SYS_C0032746;

CREATE INDEX distop_distprinc ON SIDI.DISTRIBUICAOOPERADORA (DISTRIBUICAOPRINCIPAL_ID);

ALTER TABLE SIDI.DISTRIBUICAOPRINCIPAL MODIFY DISTRIBUICAO_ID NULL;

ALTER TABLE SIDI.DISTRIBUICAOOPERADORA MODIFY DISTRIBUICAO_ID NULL