-- tabela de relacionamento entre o evento (mosaico) e os canais
create table mosaico_canal (
	evento_id NUMBER(19,0) NOT NULL,
	canal_id NUMBER(19,0) NOT NULL,
	indice number(19,0) NOT NULL,
	CONSTRAINT mosaico_canal_evento_fk FOREIGN KEY (evento_id) REFERENCES evento (id),
	CONSTRAINT mosaico_canal_canal_fk FOREIGN KEY (canal_id) REFERENCES canal (id)
);