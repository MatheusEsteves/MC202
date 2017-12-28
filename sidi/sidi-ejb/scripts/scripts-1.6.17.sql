alter table sidi.canal DROP COLUMN channelCod;
alter table sidi.canal add channelCod number(19,0);
alter table sidi.canal add fallbackTransmissionId number(19,0);
