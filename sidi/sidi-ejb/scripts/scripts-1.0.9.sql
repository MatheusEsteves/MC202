	-- Alteracoes de tabelas
	alter table distribuicao drop column justificativa;
	alter table distribuicao drop column liberado;
	alter table distribuicaooperadora add justificativa varchar2(255);
	alter table distribuicaooperadora add status varchar2(255);
	alter table distribuicaooperadora add numerocanal NUMBER(19,0);
	alter table auditoriaconflitosimportacao add data date;
	alter table auditoriaconflitosimportacao add usuario_id number(19,0);
	alter table auditoriaconflitosimportacao add constraint fk_auditoriausuario foreign key (usuario_id) references usuario(id);
	insert into perfil_funcionalidades values (30102,'GERENCIAR_PERFIS');
	
	-- Criar de relacao do usuario com a operadora
	create table usuario_operadora (
		usuario_id NUMBER(19,0) NOT NULL ENABLE,
		operadoras_id NUMBER(19,0) NOT NULL ENABLE,
		CONSTRAINT usuario_operadora_user_fk FOREIGN KEY (usuario_id)
		REFERENCES usuario (ID),
		CONSTRAINT usuario_operadora_opera_fk FOREIGN KEY (operadoras_id)
		REFERENCES operadora (ID)
	);
	
	-- Criar tabela de evento
	create table evento (
        dtype                     varchar2(255),
        id                        number(19,0) not null enable, 
        alterado                  varchar2(255 byte), 
        ap                        varchar2(255 byte), 
        apagado                   varchar2(255 byte), 
        cam                       number(10,0), 
        classificacaojogo         varchar2(255 byte), 
        data                      date, 
        descricao                 varchar2(255 byte),
        distanciacapital          number(10,0), 
        genero                    varchar2(255 byte), 
        hd                        varchar2(255 byte), 
        mm                        varchar2(255 byte), 
        observacao                varchar2(255 byte), 
        off                       varchar2(255 byte), 
        offdeslocamento           varchar2(255 byte), 
        pfi                       varchar2(255 byte), 
        pos                       varchar2(255 byte), 
        pre                       varchar2(255 byte), 
        prod                      varchar2(255 byte), 
        producaolocaldeslocamento varchar2(255 byte), 
        produtoras                varchar2(255 byte), 
        rodada                    number(10,0), 
        estadio_id                number(19,0), 
        fase_id                   number(19,0), 
        mandante_id               number(19,0),
        nome                      varchar2(255 byte),
        visitante_id              number(19,0), 
        primary key (id),
        constraint fk_evento_visitante foreign key (visitante_id) references clube(id) enable, 
	 	constraint fk_evento_mandante foreign key (mandante_id) references clube(id) enable, 
	 	constraint fk_evento_estadio foreign key (estadio_id) references estadio(id) enable, 
	 	constraint fk_evento_fase foreign key (fase_id) references fase(id) enable
	);
	
	
	-- Migrar dados da table jogo para a tabela evento
	INSERT INTO evento e
	(e.dtype, e.id, e.alterado, e.ap, e.apagado, e.cam,  e.classificacaojogo, e.data, e.distanciacapital,
	        e.genero, e.hd, e.mm, e.observacao, e.off, e.offdeslocamento, e.pfi, e.pos, e.pre, e.prod, e.producaolocaldeslocamento, e.produtoras,
	        e.rodada, e.estadio_id, e.fase_id, e.mandante_id, e.visitante_id)
	SELECT
	'JOGO' as dtype, jogo.id, jogo.alterado, jogo.ap, jogo.apagado,
	jogo.cam, jogo.classificacaojogo, jogo.data, jogo.distanciacapital, jogo.genero, jogo.hd, jogo.mm, jogo.observacao, jogo.off,
	jogo.offdeslocamento, jogo.pfi, jogo.pos, jogo.pre, jogo.prod, jogo.producaolocaldeslocamento, jogo.produtoras,
	jogo.rodada, jogo.estadio_id, jogo.fase_id, jogo.mandante_id, jogo.visitante_id
	FROM jogo;

	-- Apagar constraints
	drop table jogo cascade constraints;
	
	-- Alterar as tabelas de distribuicao
	alter table alteracaodistribuicaojogo rename column jogo_id to evento_id;
	alter table distribuicaooperadora rename column jogo_id to evento_id;
	alter table distribuicaooperadorahistorico rename column jogo_id to evento_id;
	alter table distribuicaoprincipal rename column jogo_id to evento_id;
	
	-- Criar as novas constraints
	alter table alteracaodistribuicaojogo add constraint fk_altdisjogo_evento FOREIGN KEY (evento_id) references evento (id);
	alter table distribuicaooperadora add constraint fk_distopera_evento FOREIGN KEY (evento_id) references evento (id);
	alter table distribuicaooperadorahistorico add constraint fk_distoperahist_evento FOREIGN KEY (evento_id) references evento (id);
	alter table distribuicaoprincipal add constraint fk_distprinc_evento FOREIGN KEY (evento_id) references evento (id);
