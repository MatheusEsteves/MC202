-- Campos para varchar da tabela de canal
alter table canal add temp VARCHAR2(255 BYTE);

update canal set temp = freqdownlink;
alter table canal drop column freqDownlink;
alter table canal add freqDownlink VARCHAR2(255 BYTE);
update canal set freqdownlink = temp;

update canal set temp = bandaL;
alter table canal drop column bandaL;
alter table canal add bandaL VARCHAR2(255 BYTE);
update canal set bandaL = temp;

update canal set temp = sr;
alter table canal drop column sr;
alter table canal add sr VARCHAR2(255 BYTE);
update canal set sr = temp;

update canal set temp = networkId;
alter table canal drop column networkId;
alter table canal add networkId VARCHAR2(255 BYTE);
update canal set networkId = temp;

update canal set temp = canalVirtual;
alter table canal drop column canalVirtual;
alter table canal add canalVirtual VARCHAR2(255 BYTE);
update canal set canalVirtual = temp;

update canal set temp = video;
alter table canal drop column video;
alter table canal add video VARCHAR2(255 BYTE);
update canal set video = temp;

update canal set temp = audio1e2;
alter table canal drop column audio1e2;
alter table canal add audio1e2 VARCHAR2(255 BYTE);
update canal set audio1e2 = temp;

update canal set temp = audio3e4;
alter table canal drop column audio3e4;
alter table canal add audio3e4 VARCHAR2(255 BYTE);
update canal set audio3e4 = temp;

update canal set temp = audioMpeg;
alter table canal drop column audioMpeg;
alter table canal add audioMpeg VARCHAR2(255 BYTE);
update canal set audioMpeg = temp;

update canal set temp = audioDolby;
alter table canal drop column audioDolby;
alter table canal add audioDolby VARCHAR2(255 BYTE);
update canal set audioDolby = temp;

alter table canal drop column temp;