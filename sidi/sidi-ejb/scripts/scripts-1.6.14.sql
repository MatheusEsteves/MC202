alter table comutacao add EVENTO_ID number(19,0);
alter table comutacao add constraint fk_evento foreign key (EVENTO_ID) references EVENTO(ID);