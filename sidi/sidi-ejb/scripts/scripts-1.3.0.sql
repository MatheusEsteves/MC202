-- Campos para mosaico da tabela de evento
alter table evento add ABERTURASINAL  DATE;
alter table evento add FECHAMENTOSINAL  DATE;
alter table evento add DIVISAOMOSAICO VARCHAR2(255 byte);