alter table sidi.canal DROP COLUMN channelCod;
alter table sidi.canal add channelCod VARCHAR2(4);
alter table sidi.canal add ingestPointName VARCHAR2(20);