DECLARE 
currval number := 0;
BEGIN

-- tabela usuario
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM usuario;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE USUARIO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';

-- tabela perfil
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM perfil;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE PERFIL_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';


-- tabela canal
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM canal;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE CANAL_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela operadora
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM operadora;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE OPERADORA_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela regiao
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM regiao;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE REGIAO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela campeonato
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM campeonato;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE CAMPEONATO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela AuditoriaConflitosImportacao
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM AuditoriaConflitosImportacao;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE AUDITORIA_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela brasao
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM brasao;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE BRASAO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela campeonatocanal
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM campeonatocanal;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE CAMPEONATOCANAL_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela campeonatoclube
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM campeonatoclube;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE CAMPEONATOCLUBE_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela campeonatooperadora
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM campeonatooperadora;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE CAMPEONATOOPERADORA_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela cidade
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM cidade;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE CIDADE_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela clube
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM clube;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE CLUBE_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela estadio
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM estadio;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE ESTADIO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela evento
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM evento;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE EVENTO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela fase
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM fase;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE FASE_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela headend
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM headend;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE HEADEND_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela pesoclubeestado
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM pesoclubeestado;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE PESOCLUBEESTADO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela configuracaohorario
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM configuracaohorario;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE CONFIGURACAOHORARIO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela alteracaodistribuicao
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM alteracaodistribuicao;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE ALTERACAODISTRIBUICAO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela alteracaodistribuicaojogo
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM alteracaodistribuicaojogo;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE ALTERACAODISTJOGO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela distribuicao
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM distribuicao;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE DISTRIBUICAO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela distribuicaoestado
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM distribuicaoestado;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE DISTRIBUICAOESTADO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela distribuicaohistorico
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM distribuicaohistorico;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE DISTRIBUICAOHISTORICO_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela distribuicaooperadora
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM distribuicaooperadora;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE DISTRIBUICAOOPERADORA_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela distribuicaooperadorahistorico
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM distribuicaooperadorahistorico;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE DISTRIBUICAOOPHIST_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
-- tabela distribuicaoprincipal
SELECT (coalesce(max(id), 0) + 50) INTO currval FROM distribuicaoprincipal;

EXECUTE IMMEDIATE
  'CREATE SEQUENCE DISTRIBUICAOPRINCIPAL_SEQ
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH ' || currval ||
   'INCREMENT BY 1
    CACHE 20';
    
END;