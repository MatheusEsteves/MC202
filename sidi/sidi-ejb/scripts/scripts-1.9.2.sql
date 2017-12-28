alter table usuario add apagado VARCHAR2(255 BYTE);

update usuario set apagado = 'NAO';